/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as Assert from "assert";
import * as path from "path";
import { Project } from "../../src/iar/project/project";

const TEST_PROJECT_FILE = path.resolve(__dirname, "../../../test/ewpFiles/test_project.ewp");

suite("Test project parser", () => {
    test("Load ewp file", () => {
        const project = Project.createProjectFrom(TEST_PROJECT_FILE);
        if (!project) {
            Assert.fail("Project.createProjectFrom returned undefined");
        }
        Assert.equal(project!.configurations.length, 2);
        Assert.equal(project!.configurations[0].name, "Debug");
        Assert.equal(project!.configurations[1].name, "Release");
        Assert.equal(project!.name, "test_project");
    });
});