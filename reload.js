// Created by GoodBoy.Ninja
// run using nodemon to watch for changes in src folder and copy to adobe extensions folder
// more info: https://github.com/GoodBoyNinja/CEP-ReloadJS

// prepare
const gulp = require('gulp');
const os = require("os");
const path = require("path");
const fs = require("fs");
const isWin = process.platform === "win32";
var userName = os.userInfo().username;
var extensionsFolder = isWin ? `C:/Users/${userName}/AppData/Roaming/Adobe/CEP/extensions` : `/Users/${userName}/Library/Application Support/Adobe/CEP/extensions`;


// user properties
const pathToSrc = 'src'; // (RELATIVE!!!)
const projectName = path.basename(__dirname); // get the name of the project folder
const targetFolderName = projectName + "_DevCopy";

// solve paths
const absPathToSrc = path.join(__dirname, pathToSrc);
const srcFolderName = path.basename(absPathToSrc);
const targetFolder = path.join(extensionsFolder, targetFolderName);



// this function deletes any previous copies of the src folder in the adobe extensions folder
function deletePrevious() {
    // delete previous copies in the adobe extensions folder, synchronously
    const exists = fs.existsSync(targetFolder);
    if (exists) {
        console.log("deleting:", targetFolder + "\n\n");
        fs.rmSync(targetFolder, { recursive: true });
    }
}

// this function copies the src folder to the adobe extensions folder
function copySrc() {


    fs.access(absPathToSrc, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('directory to copy does not exist');
            return;
        }
    });
    // include hidden files
    gulp.src(path.join(absPathToSrc + '/**/*'), { dot: true })
        .pipe(gulp.dest(targetFolder));

    console.log(`"${srcFolderName}" from "${projectName}" copied to ${targetFolder}`);

};


// run
deletePrevious();
copySrc();
