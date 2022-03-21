// NOTE: run in nodemon to watch for changes
const gulp = require('gulp');
const os = require("os");
const path = require("path");
const fs = require("fs");
const isWin = process.platform === "win32";

// user properties
const copyMe = 'src'; // sub folder
const thisFolderName = path.basename(__dirname);
const targetFolderName = thisFolderName + " Dev Reloading Copy";

var userName = os.userInfo().username;
var extensionsFolder = isWin ? `C:/Users/${userName}/AppData/Roaming/Adobe/CEP/extensions` : `/Users/${userName}/Library/Application Support/Adobe/CEP/extensions;`;
function copySrc() {
    fs.access(path.join(__dirname, copyMe), fs.constants.F_OK, (err) => {
        if (err) {
            console.log('directory to copy does not exist');
            return;
        }
    });
    gulp.src(path.join(__dirname, 'src/**/*'))
        .pipe(gulp.dest(path.join(extensionsFolder, targetFolderName)));

};


// copy
copySrc();
 
