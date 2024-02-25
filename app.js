// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./src/page-template.js");

// const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");

// TODO: Write Code to gather information about the development team members

// TODO additional (not requirement) - consider adding validation to ensure that user input is in the proper format.

// TODO: render the HTML file.

const AppEngine = require('./lib/engine/AppEngine');

const appEngine = AppEngine.getInstance();

appEngine.start();
