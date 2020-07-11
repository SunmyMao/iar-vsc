import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function getProjectFolder(projectFile: string): string {
    return path.win32.dirname(projectFile);
}

export function fileExists(path: string): boolean {
    return fs.existsSync(vscode.Uri.file(path).fsPath);
}
