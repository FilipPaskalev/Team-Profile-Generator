// Packages
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// Classes
const Manager = require('../employees/Manager');
const Engineer = require('../employees/Engineer');
const Intern = require('../employees/Intern');

// Enums
const EnumEmployeeType = require('../enum/EnumEmployeeType');

// Validators & Filters
const VALIDATOR = require('./promptValidators');
const FILTER = require('./promptFilters');

// Functions
const render = require('../../src/page-template');

// Constants
const OUTPUT_DIR = path.resolve(__dirname, '../../output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const requiredInput = chalk.keyword('orange');
const optionalInput = chalk.cyan;
const warning = chalk.bold.red;
const success = chalk.bold.green;
const infoMsg = chalk.bold.blue;

// TODO: create a class that is responsible for data collection - InfoCollector.js
// TODO: REFACTOR - create a class that is responsible for data validation - InfoValidator.js (refactor promptValidators.js)
// TODO: REFACTOR - create a class that is responsible for data filtering - InfoStrainer.js (refactor promptFilters.js)
// TODO: create a enumeration for the main menu choices - EnumMainMenuChoice.js
class AppEngine {
  static instance = null;
  static mainMenuChoice = [
    `Add Team Name ${requiredInput('(required)')}`,
    `Add ${EnumEmployeeType.MANAGER} ${optionalInput('(optional)')}`,
    `Add ${EnumEmployeeType.ENGINEER} ${requiredInput('(required)')}`,
    `Add ${EnumEmployeeType.INTERN} ${optionalInput('(optional)')}`,
    new inquirer.Separator(),
    `${success('Build a team')}`,
    `${warning('Exit')}`,
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

  startTerminalApp() {
    AppEngine.displayWelcomeMsg();
    AppEngine.mainMenu();
  }

  prepareOutputDir() {
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }
        resolve();
      } catch (error) {
        console.error('An error occurred while creating the output directory:', error);
        reject(error);
      }
    });
  }

  static builtHtmlPage() {
    const team = [...AppEngine.managers, ...AppEngine.engineers, ...AppEngine.interns];
    const teamName = AppEngine.teamName.toUpperCase();
    const html = render(team, teamName);
    fs.writeFileSync(outputPath, html);
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
          case AppEngine.mainMenuChoice[0]:
            AppEngine.addTeamName();
            break;
          case `Change Team Name:`:
            AppEngine.addTeamName();
            break;
          case AppEngine.mainMenuChoice[1]:
            AppEngine.addManager();
            break;
          case `Add ${EnumEmployeeType.MANAGER}`:
            AppEngine.addManager();
            break;
          case AppEngine.mainMenuChoice[2]:
            AppEngine.addEngineer();
            break;
          case `Add ${EnumEmployeeType.ENGINEER}`:
            AppEngine.addEngineer();
            break;
          case AppEngine.mainMenuChoice[3]:
            AppEngine.addIntern();
            break;
          case `Add ${EnumEmployeeType.INTERN}`:
            AppEngine.addIntern();
            break;
          case AppEngine.mainMenuChoice[5]:
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
          case AppEngine.mainMenuChoice[6]:
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

    const noneEmployeesAddedMsg = warning("You haven't added any employees yet.");

    console.log(`${infoMsg('Log info:')} ${success('Your team has been built. Here are the details:')}
${infoMsg('Log info:')} Team Name: ${AppEngine.teamName}
${infoMsg('Log info:')} Managers: ${managersNames.join(', ') || noneEmployeesAddedMsg}
${infoMsg('Log info:')} Engineers: ${engineersNames.join(', ')}
${infoMsg('Log info:')} Interns: ${internsNames.join(', ') || noneEmployeesAddedMsg}
${infoMsg('Log info:')} ${success("Thank you for using the Team Profile Generator.\nYou can find the generated HTML file in the 'output' folder.")}`);

    AppEngine.builtHtmlPage();
  }

  static addTeamName() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'teamName',
          message: 'Team name:',
          validate: VALIDATOR.isNameValid,
        },
      ])
      .then((answers) => {
        AppEngine.teamName = answers.teamName;
        AppEngine.mainMenuChoice[0] = `Change Team Name:`;
        const confirmMsg = `${infoMsg('Log info:')} Team name set to ${AppEngine.teamName}`;
        console.log(confirmMsg);
        AppEngine.mainMenu();
      });
  }

  static addEngineer() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Engineer Name:',
          validate: VALIDATOR.isNameValid,
        },
        {
          type: 'input',
          name: 'id',
          message: 'Engineer ID:',
          validate: VALIDATOR.isIdValid,
        },
        {
          type: 'input',
          name: 'email',
          message: 'Engineer Email:',
          filter: FILTER.filterEmail,
          validate: VALIDATOR.isEmailValid,
        },
        {
          type: 'input',
          name: 'github',
          message: 'Engineer GitHub username:',
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
          validate: VALIDATOR.isPhoneNumberValid,
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
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Intern Name:',
          validate: VALIDATOR.isNameValid,
        },
        {
          type: 'input',
          name: 'id',
          message: 'Intern ID:',
          validate: VALIDATOR.isIdValid,
        },
        {
          type: 'input',
          name: 'email',
          message: 'intern Email:',
          filter: FILTER.filterEmail,
          validate: VALIDATOR.isEmailValid,
        },
        {
          type: 'input',
          name: 'school',
          message: 'Intern School:',
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
    const logMsg = `${infoMsg('Log info:')}`;

    switch (role) {
      case EnumEmployeeType.MANAGER:
        console.log(`${logMsg} Employee ${name} added as ${EnumEmployeeType.MANAGER}`);
        break;
      case EnumEmployeeType.ENGINEER:
        console.log(`${logMsg} Employee ${name} added as ${EnumEmployeeType.ENGINEER}`);
        break;
      case EnumEmployeeType.INTERN:
        console.log(`${logMsg} Employee ${name} added as ${EnumEmployeeType.INTERN}`);
        break;
      default:
        console.log('Invalid role');
        break;
    }
  }

  static getInstance() {
    if (!AppEngine.instance) {
      AppEngine.instance = new AppEngine();
    }

    return AppEngine.instance;
  }
}

module.exports = AppEngine;
