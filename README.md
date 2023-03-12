# UPDATE: DON'T DO IT
This script copy-pastes your entire project into the Extensions folder every time you save a file.

It has been proven useful in my dated workflow and I have used it to build extensions from start to finish.

That said, this script is a band-aid solution to an even bigger problem: I did not understand how to properly set up a development environment.

I created it since I was eager to start making something already. I was overwhelmed by the amount of setup and learning that has to be done all at once when making a CEP extension.
<br>

## What I should have done instead:
1. My workflow these days consists of using [Vite](https://vitejs.dev) to setup a new project and symlink the entire folder into the extension folder. See: [Symlink on Mac](https://www.howtogeek.com/297721/how-to-create-and-use-symbolic-links-aka-symlinks-on-a-mac/) or [Symlink on Windows](https://winaero.com/create-symbolic-link-windows-10-powershell/)
2. Alongside the `index.html` file create an `index-dev.html` file and point the `manifest.xml` to it: 
```xml
<MainPath>./index-dev.html</MainPath>
```
3. In `index-dev.html` add the following script:
```html
<script>
    window.location.href = "http://localhost:5173/";
</script>

<!-- The port number reflects Vite's server. Run `npm run dev` to find out, or set it yourself in vite.config.js -->
```
4. `npm run dev` to start the vite server and open the extension in After-Effects.

My folder tends to look like this:
```js
MyExtension
|
|__📁 Public
    |_📄 CSInterface.js
|__📁 src
|   |_ // Your source code
|__📁 dist
|__📁 node_modules
|__📁 package.json
|__📁 vite.config.js
|__📁 CSXS
|   |_📄 manifest.xml
|__📄 index.html // Vite will build this file
|__📄 index-dev.html // After-Effects will load this file, then redirect to localhost:5173
|__📄 vite.config.js
|__📄 package.json
|
|__📄 .gitignore
|__📄 .debug

```

There is more setup to do, but this is the gist of getting started.



If you are intimidated by making your first extension, see: [Your-First-CEP-Panel](https://github.com/GoodBoyNinja/Your-First-CEP-Panel)



If you wish to continue using this script anyways (I don't recommend it), read on.


<br><br><br>



# CEP-ReloadJS - Work outside the extension folder
__Deprecated!__
 * While this readme is quite long, the whole proccess takes just a few minutes to setup. After the first time there is zero to no setup involved

reload.js lets you develop your extension anywhere on your machine. Everytime you hit `save / ctrl+s` this script will copy your project and paste it in Adobe's extensions folder. From there you can refresh your extension inside After-Effects and see your changes taking place in real time.



### Folder structure requirements 
Make sure you are working inside a `src` folder, and place `reload.js` outside of it. It should look somewhat like this:

```
myExtension/
        |_reload.js   <----
        |_package.json
        |_src/
        |     |__ js/
        |     |__ jsx/
        |     |__ -html/
        |     |__ -css/
        |     |__ -assets/
        |     |__ -CSXS/
        |
        |_dist/
        
```
* If you don't want to work that way, feel free to modify [reload.js](reload.js) to your liking.
---

### Machine Setup (1 time)
1. Install [nodejs](https://nodejs.org/en/)
2. From terminal / cmd / vscode terminal, install [nodemon](https://nodemon.io/) using `npm install -g nodemon`
---

### Extension Setup (Once per extension)
1. Open your folder in vscode and open a terminal using `file->terminal->new terminal` (alternativley, use a regular teminal and cd to your extension folder)
3. Type in `npm init` to create a  **package.json** file (If this is new to you, [learn here](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/))
4. In your **package.json** add gulp as a dependency, as well as a nodemon configuration in order to make sure it watches the desired file types for changes.
```
  "devDependencies": {
    "gulp": "^4",
  },
    "nodemonConfig": {
    "ext": "js,html, jsx, css, scss, json, md, xml"
  }
```
5. From the terminal, run `npm install`.


---

# Run (Automatically / Manually)
To use reload.js, open your extension folder in vscode and run `nodemon reload.js` in the terminal.
If you don't want to do this everytime you re-open vscode or reload your extension folder into vscode, you can create a task:


### Run Automatically using a task:
1. In vscode with your extension folder open, hit `ctrl/cmd + shift + p` and type in `Tasks`. Click `Tasks: Manage Automatic Tasks in Folder`, then click `Allow Automatic Tasks in Folder`
2. Create a `.vscode` folder in your extension’s root folder, and add the following file, called `tasks.json`:
```js
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Start Good Boy Ninja's reload.js",
            "type": "shell",
            "command": "nodemon reload.js",
            "runOptions": {
                "runOn": "folderOpen"
            }
        }
    ]
}
```
3. Save the file. Done.

---

### Verify it works:
Make a change to any file and save it. nodemon should run reload.js and should output the following message:
 ![image](https://user-images.githubusercontent.com/66829812/178119160-7ed43c71-2f3f-4fd5-a9f0-757ed0231473.png)
 
To verify the result, go to:
 - windows: `C:\Users\**username**\AppData\Roaming\Adobe\CEP\extensions`
 - mac: `/Users/**userName**/Library/Application Support/Adobe/CEP/extensions`
 


A folder named `myExtension_DevCopy` should exist there, where `myExtension` is the name of the folder `reload.js` lives inside of.
If it's there, you should be able to open your extension from After-Effects and have it reload when you make changes (Follow this post to learn [how to refresh the panel without closing and reopening it.](https://community.adobe.com/t5/illustrator-discussions/reload-cep-panel-extension-and-its-extendscript-without-restarting-illustrator/m-p/10844579)

### Why not use symbolic link?
Because when using symbolic link you are at risk of deleting your `src` folder and lose your progress using a ZXP installer to remove your extension (In the case that you are testing out your ZXP file and want to uninstall / reinstall it). It happened to me multiple times and dropbox saved my butt.

### Downsides
I assume this could be a bit slow on older machines and bigger projects, but for me it is probably worth it in the long run.

Love.
Good Boy Ninja

