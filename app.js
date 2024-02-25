// Classes
const Employee = require("./lib/employees/Employee.js");
const Engineer = require("./lib/employees/Engineer.js");
const Intern = require("./lib/employees/Intern.js");
const Manager = require("./lib/employees/Manager.js");

// Node modules
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members

// TODO additional (not requirement) - consider adding validation to ensure that user input is in the proper format.

// TODO: render the HTML file.
