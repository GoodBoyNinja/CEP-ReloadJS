# CEP-Auto-Folder-Copy
A way to work on CEP projects outside of the adobe extensions folder and without using Symbolic Link (Which can cause accidental deletion of files)

If you are new to nodeJS because you are coming from extendscript background, learn it! It's worth it. Don't be afraid of the spooky **TeRmINaL**.
Once you are comfortable with it and have everything installed, this proccess takes a few seconds.

# What does it do?
It creates a copy of your `src` folder (working directory) in  (windows) `C:\Users\**username**\AppData\Roaming\Adobe\CEP\extensions` or (mac) `/Users/**userName**/Library/Application Support/Adobe/CEP/extensions` so you can reload the extension in After-Effects but still work from outside the extensions folder.


# Setup:
1. Install [nodejs](https://nodejs.org/en/)
2. From the terminal / console, install [nodemon](https://nodemon.io/). Nodemon watches the folder for changes, then run a script when those exist.
3. to create a `package.json` file in your extension folder, use `npm init` from a terminal inside Visual Studio Code. If this is new to you, [learn here](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)
4. In your `package.json` add gulp as a dependency:
```
  "devDependencies": {
    "gulp": "^4",
}
```
5. from the terminal in Visual Studio Code, run `npm install` and give it a second to do its thing.


# Instructions
1. Make sure you are working inside a `src` folder, and place `reload.js` outside of it. It should look somewhat like this:

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
2. from the terminal in Visual Studio Code, run `nodemon reload.js`
3. Make a change to a file and save it.

If done correctly, you will see the terminal updating on each save.
