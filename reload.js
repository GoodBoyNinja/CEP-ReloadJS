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
var extensionsFolder = isWin ? path.join(`C:/Users/${userName}/AppData/Roaming/Adobe/CEP/extensions`) : path.join(`/Users/${userName}/Library/Application Support/Adobe/CEP/extensions`);

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

    // make sure the target path is deeper then the extension folder path, to avoid deleting the extension folder or any of its parent folders
    const deleteIsSafe = targetFolder.length > extensionsFolder.length;

    if (!deleteIsSafe) {
        console.log('ERROR: cannot delete previous copy, targetFolder path seems to be outside of the extensions folder, or the extension folder itself.\n Path is: ' + targetFolder);
    } else if (exists) {
        console.log(`Deleting previous copy from:\n🗑️ 📂"${targetFolder}"\n\n`);
        fs.rmSync(targetFolder, { recursive: true });
    }
}

// this function copies the src folder to the adobe extensions folder
function copySrc() {

    console.log(`Pasting new copy to:\n✂️ 📂 ${targetFolder}\n\n`);


    fs.access(absPathToSrc, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('⚠️ ERROR: directory to copy does not exist');
            return;
        }
    });

    // include hidden files
    gulp.src(path.join(absPathToSrc + '/**/*'), { dot: true })
        .pipe(gulp.dest(targetFolder));


    console.log(`✅"${srcFolderName}" from "${projectName}" copied to ${targetFolder} successfully!`);

};


// run
deletePrevious();
copySrc();
