# :rocket: Workflow Boilerplate with Gulp, WordPress(Underscores) + SASS + BrowserSync

## Instructions for the boilerplate

* Clone the repository.

* Use this command to install all dependencies for the project:

```bash
# Uses package.json "devDependencies" to install dependencies
npm install
```

* Start `gulp` by running:

```bash
npm start
```

* Write code in the `src`-folder.

## First things first
1. Make sure to clone this boilerplate inside a MAMP, LAMP, or any other similar local server environment.
2. Install local WordPress in the clone's root folder
    - Rename that WordPress installation folder -- from `wordpress` to `localwp` -- (./localwp).
    - Do the wordpress install as you normally would. For more info on how to install WordPress locally on a Mac, checkout the codex: (https://codex.wordpress.org/Installing_WordPress_Locally_on_Your_Mac_With_MAMP)
3. Create a new folder, name it to your liking, in `./localwp/wp-content/themes/[yourcustomthemefolder]`.
4. In gulpfile.js:
    - Modify the value of `LOCALWP_MYCUSTOMTHEME_PATH` to `localwp/wp-content/themes/[yourcustomthemefolder name]/`.
    - Adjust the value of `PROXY_PATH` to `http://localhost:[port number -- 8888 or 8080 most likely]/path/to/where/you/cloned/gulp__wordpress`.
4. You must develop your 'everything' wordpress, i.e. php templates inside `./src/_wptheme` folder.
5. Any custom JavaScript are developed under `./src/js` folder.
6. Likewise, all .scss files are developed under `./src/scss` folder.

## Folder structure

* `src/` - This is where your development-files are. These are the individual folders for JavaScript and SASS you work in
    - `js/` - All unconverted `js`-files
    - `scss/` - All unconverted `scss`-files
* `src/_wptheme/` - This is your WordPress theme development folder
    - `js/` - All converted `js`-files go here first, then automatically copied to './localwp/wp-content/themes/[yourcustomthemefolder]' folder. I know, redundant but it works for now. Will refactor this soon.
    - `/style.css` - The WordPress theme header and all converted `scss`-files converge here, then automatically copied to './localwp/wp-content/themes/[yourcustomthemefolder]'.
* `localwp/` - This is your local WordPress installation, __**must be created first**__. See 'First things first' instructions above.
* `Gulpfile.js` - This config file must be in the root-folder
* `package.json` - All the dependencies and config for the project


## Dependencies used in this boilerplate

* [gulp](https://www.npmjs.com/package/gulp)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename)
* [browser-sync](https://www.npmjs.com/package/browser-sync)
* [gulp-postcss](https://www.npmjs.com/package/gulp-postcss)
* [autoprefixer](https://www.npmjs.com/package/autoprefixer)
* [gulp-babel](https://www.npmjs.com/package/gulp-babel)
* [babel-preset-env](https://www.npmjs.com/package/babel-preset-env)
* [browserify](https://www.npmjs.com/package/browserify)
* [babelify](https://www.npmjs.com/package/babelify)
* [gulp-util](https://www.npmjs.com/package/gulp-util)
* [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
