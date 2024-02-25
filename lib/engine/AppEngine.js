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
            // TODO: finish building the team
            this.finishBuildingTheTeam();
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

  static finishBuildingTheTeam() {
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
          validate: (input) => {
            if (input === '') return 'Team name cannot be empty';
            if (input.length > 50) return 'Team name cannot exceed 50 characters';
            return true;
          },
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
          validate: (input) => {
            if (input === '') return 'Name cannot be empty';
            if (input.length > 50) return 'Name cannot exceed 50 characters';
            return true;
          },
        },
        {
          type: 'input',
          name: 'id',
          message: 'ID:',
          validate: (input) => {
            if (input === '') return 'ID cannot be empty';
            if (input.length > 50) return 'ID cannot exceed 50 characters';
            return true;
          },
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email:',
          filter: (input) => input.toLowerCase(),
          validate: (input) => {
            if (input === '') return 'Email cannot be empty';
            if (input.length > 50) return 'Email cannot exceed 50 characters';
            if (!input.includes('@') || !input.includes('.')) return 'Email must contain an "@" and "." symbols';
            return true;
          },
        },
        {
          type: 'input',
          name: 'github',
          message: 'GitHub username:',
          validate: (input) => {
            if (input === '') return 'GitHub username cannot be empty';
            if (input.length > 50) return 'GitHub username cannot exceed 50 characters';
            return true;
          },
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
          validate: (input) => {
            if (input === '') return 'Name cannot be empty';
            if (input.length > 50) return 'Name cannot exceed 50 characters';
            return true;
          },
        },
        {
          type: 'input',
          name: 'id',
          message: 'ID:',
          validate: (input) => {
            if (input === '') return 'ID cannot be empty';
            if (input.length > 50) return 'ID cannot exceed 50 characters';
            return true;
          },
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email:',
          filter: (input) => input.toLowerCase(),
          validate: (input) => {
            if (input === '') return 'Email cannot be empty';
            if (input.length > 50) return 'Email cannot exceed 50 characters';
            // TODO: validate if input is email address with regex
            if (!input.includes('@') || !input.includes('.')) return 'Email must contain an "@" and "." symbols';
            return true;
          },
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: 'Office number:',
          validate: (input) => {
            if (isNaN(input)) return 'Office number must be a number';
            if (input === '') return 'Office number cannot be empty';
            if (input.length > 50) return 'Office number cannot exceed 50 characters';
            return true;
          },
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
          validate: (input) => {
            if (input === '') return 'Name cannot be empty';
            if (input.length > 50) return 'Name cannot exceed 50 characters';
            return true;
          },
        },
        {
          type: 'input',
          name: 'id',
          message: 'ID:',
          validate: (input) => {
            if (input === '') return 'ID cannot be empty';
            if (input.length > 50) return 'ID cannot exceed 50 characters';
            return true;
          },
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email:',
          filter: (input) => input.toLowerCase(),
          validate: (input) => {
            if (input === '') return 'Email cannot be empty';
            if (input.length > 50) return 'Email cannot exceed 50 characters';
            if (!input.includes('@') || !input.includes('.')) return 'Email must contain an "@" and "." symbols';
            return true;
          },
        },
        {
          type: 'input',
          name: 'school',
          message: 'School:',
          validate: (input) => {
            if (input === '') return 'School cannot be empty';
            if (input.length > 50) return 'School cannot exceed 50 characters';
            return true;
          },
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
        console.log(`Manager: ${name}`);
        break;
      case EnumEmployeeType.ENGINEER:
        console.log(`Engineer: ${name}`);
        break;
      case EnumEmployeeType.INTERN:
        console.log(`Intern: ${name}`);
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
