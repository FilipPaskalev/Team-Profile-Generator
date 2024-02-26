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
// TODO: REFACTOR - create a class that is responsible for text coloring - TerminalPainter.js. Move all from  chalk to TerminalPainter.js
// TODO: REFACTOR - create a class that is responsible for displaying messages - MessagesRenderer.js
// TODO: REFACTOR - create a class that is responsible for displaying the main menu - MainMenuRenderer.js
// TODO: REFACTOR - create a class that is responsible for building the html page - HtmlPageBuilder.js

/**
 * The AppEngine class is responsible for the main application logic. The class is a singleton and is responsible for starting the terminal application, preparing the output directory, building the HTML page, displaying the welcome message, displaying the main menu, and building the team.
 * @class AppEngine
 * @typedef {AppEngine}
 * @property {AppEngine} instance The instance of the AppEngine class
 * @property {Array<string>} mainMenuChoice The main menu choices
 * @property {string} teamName The name of the team
 * @property {Array<Manager>} managers The managers of the team
 * @property {Array<Engineer>} engineers The engineers of the team
 * @property {Array<Intern>} interns The interns of the team
 * @method startTerminalApp Start the terminal application
 * @method prepareOutputDir Prepare the output directory
 * @method builtHtmlPage Build the HTML page
 * @method displayWelcomeMsg Display the welcome message
 * @method mainMenu Display the main menu
 * @method buildTeam Build the team
 * @method addTeamName Add the team name
 * @method addEngineer Add an engineer
 * @method addManager Add a manager
 * @method addIntern Add an intern
 * @method confirmAddedEmployee Confirm the added employee
 * @method getInstance Get the instance of the AppEngine class
 * @instance AppEngine
 */
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

  /**
   * Creates an instance of AppEngine.
   * @constructor AppEngine
   * @memberof AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   * appEngine.startTerminalApp();
   */
  constructor() {
    if (AppEngine.instance) {
      return AppEngine.instance;
    }
    AppEngine.instance = this;
  }

  /**
   * Get the name of the team.
   * @readonly
   * @type {string}
   * @memberof AppEngine
   * @instance AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   */
  get teamName() {
    return AppEngine.teamName;
  }

  /**
   * @readonly
   * @type {Array<Manager>}
   * @memberof AppEngine
   * @instance AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   */
  get managers() {
    return AppEngine.managers;
  }

  /**
   * @readonly
   * @type {Array<Engineer>}
   * @memberof AppEngine
   * @instance AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   */
  get engineers() {
    return AppEngine.engineers;
  }

  /**
   * @readonly
   * @type {Array<Intern>}
   * @memberof AppEngine
   * @instance AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   */
  get interns() {
    return AppEngine.interns;
  }

  /**
   * Start the terminal application.
   * @memberof AppEngine
   * @method startTerminalApp
   * @instance AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   * appEngine.startTerminalApp();
   * @returns {void}
   * @throws {Error} If an error occurs while creating the output directory
   */
  startTerminalApp() {
    AppEngine.displayWelcomeMsg();
    AppEngine.mainMenu();
  }

  /**
   * Prepare the output directory.
   * @memberof AppEngine
   * @method prepareOutputDir
   * @instance AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   * appEngine.prepareOutputDir();
   * @returns {Promise<void>}
   * @throws {Error} If an error occurs while creating the output directory
   */
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

  /**
   * Build the HTML page.
   * @memberof AppEngine
   * @method builtHtmlPage
   * @instance AppEngine
   * @static AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   * appEngine.builtHtmlPage();
   * @returns {void}
   * @throws {Error} If an error occurs while writing the HTML file
   * @see {@link render}
   * @see {@link outputPath}
   * @see {@link fs}
   * @see {@link AppEngine.managers}
   * @see {@link AppEngine.engineers}
   * @see {@link AppEngine.interns}
   * @see {@link AppEngine.teamName}
   * @see {@link fs.writeFileSync}
   * @see {@link outputPath}
   * @see {@link html}
   */
  static builtHtmlPage() {
    const team = [...AppEngine.managers, ...AppEngine.engineers, ...AppEngine.interns];
    const teamName = AppEngine.teamName.toUpperCase();
    const html = render(team, teamName);
    fs.writeFileSync(outputPath, html);
  }

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method displayWelcomeMsg
   * @instance AppEngine
   * @example
   * AppEngine.displayWelcomeMsg();
   * @returns {void}
   */
  static displayWelcomeMsg() {
    console.log('='.repeat(60));
    console.log(' '.repeat(12) + 'Welcome to the Team Profile Generator');
    console.log('='.repeat(60));
  }

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method mainMenu
   * @instance AppEngine
   * @example
   * AppEngine.mainMenu();
   * @returns {void}
   * @throws {Error} If an error occurs while displaying the main menu
   * @see {@link inquirer}
   * @see {@link AppEngine.mainMenuChoice}
   * @see {@link AppEngine.addTeamName}
   * @see {@link AppEngine.addManager}
   * @see {@link AppEngine.addEngineer}
   * @see {@link AppEngine.addIntern}
   * @see {@link AppEngine.buildTeam}
   * @see {@link AppEngine.teamName}
   * @see {@link AppEngine.engineers}
   * @see {@link AppEngine.builtHtmlPage}
   */
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

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method buildTeam
   * @instance AppEngine
   * @example
   * AppEngine.buildTeam();
   * @returns {void}
   * @throws {Error} If an error occurs while building the team
   */
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

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method addTeamName
   * @instance AppEngine
   * @example
   * AppEngine.addTeamName();
   * @returns {void}
   * @throws {Error} If an error occurs while adding the team name
   * @see {@link inquirer}
   * @see {@link VALIDATOR.isNameValid}
   */
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

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method addEngineer
   * @instance AppEngine
   * @example
   * AppEngine.addEngineer();
   * @returns {void}
   * @throws {Error} If an error occurs while adding an engineer
   * @see {@link inquirer}
   * @see {@link VALIDATOR.isNameValid}
   * @see {@link VALIDATOR.isIdValid}
   * @see {@link FILTER.filterEmail}
   * @see {@link VALIDATOR.isEmailValid}
   * @see {@link VALIDATOR.isGitHubUsernameValid}
   */
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

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method addManager
   * @instance AppEngine
   * @example
   * AppEngine.addManager();
   * @returns {void}
   * @throws {Error} If an error occurs while adding a manager
   * @see {@link inquirer}
   * @see {@link VALIDATOR.isNameValid}
   * @see {@link VALIDATOR.isIdValid}
   * @see {@link FILTER.filterEmail}
   * @see {@link VALIDATOR.isEmailValid}
   * @see {@link VALIDATOR.isPhoneNumberValid}
   */
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

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method addIntern
   * @instance AppEngine
   * @example
   * AppEngine.addIntern();
   * @returns {void}
   * @throws {Error} If an error occurs while adding an intern
   * @see {@link inquirer}
   * @see {@link VALIDATOR.isNameValid}
   * @see {@link VALIDATOR.isIdValid}
   * @see {@link FILTER.filterEmail}
   * @see {@link VALIDATOR.isEmailValid}
   * @see {@link VALIDATOR.isSchoolNameValid}
   */
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

  /**
   * @static AppEngine
   * @memberof AppEngine
   * @method confirmAddedEmployee
   * @instance AppEngine
   * @example
   * AppEngine.confirmAddedEmployee('John Doe', EnumEmployeeType.MANAGER);
   * @param {string} name The name of the employee
   * @param {EnumEmployeeType} role The role of the employee
   * @returns {void}
   * @throws {Error} If the role is invalid
   * @see {@link EnumEmployeeType.MANAGER}
   * @see {@link EnumEmployeeType.ENGINEER}
   * @see {@link EnumEmployeeType.INTERN}
   */
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

  /**
   * Get the instance of the AppEngine class.
   * @memberof AppEngine
   * @method getInstance
   * @instance AppEngine
   * @example
   * const appEngine = AppEngine.getInstance();
   * @returns {AppEngine}
   * @throws {Error} If an error occurs while getting the instance of the AppEngine class
   */
  static getInstance() {
    if (!AppEngine.instance) {
      AppEngine.instance = new AppEngine();
    }

    return AppEngine.instance;
  }
}

module.exports = AppEngine;
