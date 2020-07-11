import * as utility from './utility';
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import { Settings } from "../settings"

export async function getProjectData(): Promise<any> {
    var projectFile = Settings.getEwpFile()
    if (projectFile == undefined){
        return Promise.reject('Project file does not exist');
    }
    if (utility.fileExists(projectFile.toString())) {
        let xml_string = fs.readFileSync(projectFile, "utf8");
        return xml2js.parseStringPromise(xml_string);
    }

    return Promise.reject('Project file does not exist');
}

export function saveProjectData(projectData: any): boolean {
    var projectFile = Settings.getEwpFile()
    if (projectFile == undefined) {
        return false;
    }

    var builder = new xml2js.Builder({ rootName: "project", renderOpts: { "pretty": true, "indent": "    ", "newline": "\r\n" } });
    var xml = builder.buildObject(projectData.project);
    var hasError = false;
    fs.writeFile(projectFile, xml, function (err: any) {
        if (err) {
            console.log(err);
            hasError = true;
        }
    });
    return !hasError;
}