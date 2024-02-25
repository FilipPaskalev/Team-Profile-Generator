// Packages
const inquirer = require('inquirer');
// const path = require("path");
// const fs = require("fs");

// Classes
const Manager = require('../employees/Manager');
const Engineer = require('../employees/Engineer');
const Intern = require('../employees/Intern');

// Enums
const EnumEmployeeType = require('../enum/EnumEmployeeType');

// Validators & Filters
const VALIDATOR = require('./promptValidators');
const FILTER = require('./promptFilters');

class AppEngine {
  static instance = null;
  static mainMenuChoice = [
    'Add Team Name (required)',
    `Add ${EnumEmployeeType.MANAGER} (optional)`,
    `Add ${EnumEmployeeType.ENGINEER} (required)`,
    `Add ${EnumEmployeeType.INTERN} (optional)`,
    'Finish building team',
  ];
  static teamName = '';
  static managers = [];
  static engineers = [];
  static interns = [];

  constructor() {
    if (AppEngine.instance) {
      return AppEngine.instance;
    }
    AppEngine.instance = this;
  }

  getTeamName() {
    return AppEngine.teamName;
  }

  getManagers() {
    return AppEngine.managers;
  }

  getEngineers() {
    return AppEngine.engineers;
  }

  getInterns() {
    return AppEngine.interns;
  }

  start() {
    AppEngine.displayWelcomeMsg();
    AppEngine.mainMenu();
  }

  static displayWelcomeMsg() {
    console.log('='.repeat(60));
    console.log(' '.repeat(12) + 'Welcome to the Team Profile Generator');
    console.log('='.repeat(60));
  }

  static mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'mainMenu',
          message: 'Main Menu:',
          choices: AppEngine.mainMenuChoice,
        },
      ])
      .then((answers) => {
        switch (answers.mainMenu) {
          case 'Add Team Name (required)':
            AppEngine.addTeamName();
            break;
          case `Change Team Name:`:
            AppEngine.addTeamName();
            break;
          case `Add ${EnumEmployeeType.MANAGER} (optional)`:
            AppEngine.addManager();
            break;
          case `Add ${EnumEmployeeType.ENGINEER} (required)`:
            AppEngine.addEngineer();
            break;
          case `Add ${EnumEmployeeType.ENGINEER}`:
            AppEngine.addEngineer();
            break;
          case `Add ${EnumEmployeeType.INTERN} (optional)`:
            AppEngine.addIntern();
            break;
          case 'Finish building team':
            if (AppEngine.teamName === '') {
              console.log('Team name is required');
              break;
            }
            if (AppEngine.engineers.length === 0) {
              console.log('At least one engineer is required');
              break;
            }
            AppEngine.buildTeam();
            break;
          default:
            console.log('Invalid choice');
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static buildTeam() {
    console.log(`\n\n${'='.repeat(60)}\nTeam Name: ${AppEngine.teamName}\n${'='.repeat(60)}`);
    console.log('Managers:');
    AppEngine.managers.forEach((manager) => {
      console.log(manager.getRole());
      console.log(`Name: ${manager.getName()}`);
      console.log(`ID: ${manager.getId()}`);
      console.log(`Email: ${manager.getEmail()}`);
      console.log(`Office number: ${manager.getOfficeNumber()}`);
    });
    console.log('*'.repeat(60));
    console.log('Engineers:');
    AppEngine.engineers.forEach((engineer) => {
      console.log(engineer.getRole());
      console.log(`Name: ${engineer.getName()}`);
      console.log(`ID: ${engineer.getId()}`);
      console.log(`Email: ${engineer.getEmail()}`);
      console.log(`GitHub: ${engineer.getGithub()}`);
    });
    console.log('*'.repeat(60));
    console.log('Interns:');
    AppEngine.interns.forEach((intern) => {
      console.log(intern.getRole());
      console.log(`Name: ${intern.getName()}`);
      console.log(`ID: ${intern.getId()}`);
      console.log(`Email: ${intern.getEmail()}`);
      console.log(`School: ${intern.getSchool()}`);
    });
  }

  static addTeamName() {
    console.log('Team Name:');

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'teamName',
          message: 'Enter the name of the team:',
          validate: VALIDATOR.isNameValid,
        },
      ])
      .then((answers) => {
        AppEngine.teamName = answers.teamName;
        AppEngine.mainMenuChoice[0] = `Change Team Name:`;
        console.log(`${'-'.repeat(60)}\nTeam name set to: ${AppEngine.teamName}\n${'-'.repeat(60)}`);
        AppEngine.mainMenu();
      });
  }

  static addEngineer() {
    console.log('Engineer details:');

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Name:',
          validate: VALIDATOR.isNameValid,
        },
        {
          type: 'input',
          name: 'id',
          message: 'ID:',
          validate: VALIDATOR.isIdValid,
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email:',
          filter: FILTER.filterEmail,
          validate: VALIDATOR.isEmailValid,
        },
        {
          type: 'input',
          name: 'github',
          message: 'GitHub username:',
          validate: VALIDATOR.isGitHubUsernameValid,
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        AppEngine.engineers.push(engineer);
        AppEngine.mainMenuChoice[2] = `Add ${EnumEmployeeType.ENGINEER}`;
        AppEngine.confirmAddedEmployee(answers.name, EnumEmployeeType.ENGINEER);
        AppEngine.mainMenu();
      });
  }

  static addManager() {
    console.log('Manager details:');

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Name:',
          validate: VALIDATOR.isNameValid,
        },
        {
          type: 'input',
          name: 'id',
          message: 'ID:',
          validate: VALIDATOR.isIdValid,
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email:',
          filter: FILTER.filterEmail,
          validate: VALIDATOR.isEmailValid,
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: 'Office number:',
          validate: VALIDATOR.isOfficeNumberValid,
        },
      ])
      .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        AppEngine.managers.push(manager);
        AppEngine.mainMenuChoice[1] = `Add ${EnumEmployeeType.MANAGER}`;
        AppEngine.confirmAddedEmployee(answers.name, EnumEmployeeType.MANAGER);
        AppEngine.mainMenu();
      });
  }

  static addIntern() {
    console.log('Intern details:');

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Name:',
          validate: VALIDATOR.isNameValid,
        },
        {
          type: 'input',
          name: 'id',
          message: 'ID:',
          validate: VALIDATOR.isIdValid,
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email:',
          filter: FILTER.filterEmail,
          validate: VALIDATOR.isEmailValid,
        },
        {
          type: 'input',
          name: 'school',
          message: 'School:',
          validate: VALIDATOR.isSchoolNameValid,
        },
      ])
      .then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        AppEngine.interns.push(intern);
        AppEngine.mainMenuChoice[3] = `Add ${EnumEmployeeType.INTERN}`;
        AppEngine.confirmAddedEmployee(answers.name, EnumEmployeeType.INTERN);
        AppEngine.mainMenu();
      });
  }

  static confirmAddedEmployee(name, role) {
    console.log('-'.repeat(60));
    console.log('You have added the following employee:');
    switch (role) {
      case EnumEmployeeType.MANAGER:
        console.log(`${EnumEmployeeType.MANAGER}: ${name}`);
        break;
      case EnumEmployeeType.ENGINEER:
        console.log(`${EnumEmployeeType.ENGINEER}: ${name}`);
        break;
      case EnumEmployeeType.INTERN:
        console.log(`${EnumEmployeeType.INTERN}: ${name}`);
        break;
      default:
        console.log('Invalid role');
        break;
    }
    console.log('-'.repeat(60));
  }

  static getInstance() {
    if (!AppEngine.instance) {
      AppEngine.instance = new AppEngine();
    }

    return AppEngine.instance;
  }
}

module.exports = AppEngine;
