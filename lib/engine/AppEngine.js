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
    'Exit',
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

  get teamName() {
    return AppEngine.teamName;
  }

  get managers() {
    return AppEngine.managers;
  }

  get engineers() {
    return AppEngine.engineers;
  }

  get interns() {
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
          case `Add ${EnumEmployeeType.MANAGER}`:
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
          case `Add ${EnumEmployeeType.INTERN}`:
            AppEngine.addIntern();
            break;
          case 'Finish building team':
            if (AppEngine.teamName === '') {
              console.log('Team name is required');
              AppEngine.mainMenu();
              break;
            }
            if (AppEngine.engineers.length === 0) {
              console.log('At least one engineer is required');
              break;
            }
            AppEngine.buildTeam();
            break;
          case 'Exit':
            console.log('='.repeat(60));
            console.log('Thank you for using the Team Profile Generator');
            console.log('Exiting the application...');
            console.log('='.repeat(60));
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
    const managersNames = AppEngine.managers.map((manager) => manager.getName());
    const engineersNames = AppEngine.engineers.map((engineer) => engineer.getName());
    const internsNames = AppEngine.interns.map((intern) => intern.getName());

    console.log(`
  ${'='.repeat(60)}
  Your team has been built. Here are the details:
  Team Name: ${AppEngine.teamName}
  Managers: ${managersNames.join(', ') || "You haven't added any managers yet."}
  Engineers: ${engineersNames.join(', ')}
  Interns: ${internsNames.join(', ') || "You haven't added any interns yet."}
  Thank you for using the Team Profile Generator.
  You can find the generated HTML file in the 'output' folder.
  ${'='.repeat(60)}`);
  }

  static addTeamName() {
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
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Manager Name:',
          validate: VALIDATOR.isNameValid,
        },
        {
          type: 'input',
          name: 'id',
          message: 'Manager ID:',
          validate: VALIDATOR.isIdValid,
        },
        {
          type: 'input',
          name: 'email',
          message: 'Manager Email:',
          filter: FILTER.filterEmail,
          validate: VALIDATOR.isEmailValid,
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: 'Manager Office Number:',
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
