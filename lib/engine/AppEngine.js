// Packages
const inquirer = require('inquirer')
// const path = require("path");
// const fs = require("fs");

// Classes
const Manager = require('../employees/Manager')

// Enums
const EnumEmployeeType = require('../enum/EnumEmployeeType')

class AppEngine {
  static mainMenuChoice = ['Add Team Name', 'Add Manager', 'Add Engineer', 'Add Intern', 'Generate Team Profile (Exit)']

  constructor() {
    this.team = []
    this.teamName = ''
  }

  static displayWelcomeMsg() {
    console.log('Welcome to the Team Profile Generator')
  }

  static mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'mainMenuChoice',
          message: 'Menu:',
          choices: this.mainMenuChoice,
        },
      ])
      .then((answers) => {
        switch (answers.mainMenuChoice) {
          case this.mainMenuChoice[0]:
            AppEngine.addTeamName()
            break
          case this.mainMenuChoice[1]:
            AppEngine.addManager()
            break
          case this.mainMenuChoice[2]:
            AppEngine.addEngineer()
            break
          case this.mainMenuChoice[3]:
            AppEngine.addIntern()
            break
          case this.mainMenuChoice[4]:
            AppEngine.exit()
            break
          default:
            console.log('Invalid choice')
            break
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static addTeamName() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'teamName',
          message: 'Enter the name of the team:',
        },
      ])
      .then((answers) => {
        this.teamName = answers.teamName
        this.mainMenu()
      })
  }

  static addManager() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: "Enter the manager's name:",
          validate: (input) => {
            if (input === '') return 'Name cannot be empty'
            if (input.length > 50) return 'Name cannot exceed 50 characters'
            if (!/^[a-zA-Z\s]*$/.test(input)) return 'Name can only contain letters and spaces'
            return true
          },
        },
        {
          type: 'input',
          name: 'id',
          message: "Enter the manager's id:",
        },
        {
          type: 'input',
          name: 'email',
          message: "Enter the manager's email:",
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: "Enter the manager's office number:",
        },
      ])
      .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        this.team.push(manager)
        this.mainMenu()
      })
  }
}

module.exports = AppEngine
