// Packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Classes
const Engineer = require("../classes/Engineer");
const Intern = require("../classes/Intern");
const Manager = require("../classes/Manager");

class AppEngine {
  constructor() {
    this.inquirer = inquirer;
    this.team = [];
  }

  welcome() {
    console.log("Welcome to the Team Profile Generator");
  }

  menu() {
    this.inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: ["Manager", "Engineer", "Intern", "Done"],
        },
      ])
      .then((answers) => {
        switch (answers.role) {
          case "Manager":
            this.addManager();
            break;
          case "Engineer":
            this.addEngineer();
            break;
          case "Intern":
            this.addIntern();
            break;
          case "Done":
            this.generateHtml();
            break;
        }
      });
  }

  addManager() {
    this.inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the manager's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the manager's ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the manager's email?",
        },
        {
          type: "input",
          name: "officeNumber",
          message: "What is the manager's office number?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        team.push(manager);
      });
  }

  addIntern() {
    this.inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the intern's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the intern's ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the intern's email?",
        },
        {
          type: "input",
          name: "school",
          message: "What is the intern's school?",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        team.push(intern);
      });
  }

  addEngineer() {
    this.inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the engineer's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the engineer's ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the engineer's email?",
        },
        {
          type: "input",
          name: "github",
          message: "What is the engineer's GitHub username?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        team.push(engineer);
      });
  }
}

module.exports = AppEngine;
