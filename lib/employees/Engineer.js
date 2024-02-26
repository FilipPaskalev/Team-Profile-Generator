const Employee = require('./Employee');
const EnumEmployeeType = require('../enum/EnumEmployeeType');

/**
 * Engineer class is a class for all engineer employees. It extends the Employee class.
 * @class Engineer
 * @typedef {Engineer}
 * @extends {Employee}
 * @property {string} github The GitHub username of the engineer
 * @property {EnumEmployeeType.ENGINEER} role The role of the engineer
 * @method getGithub Get the GitHub username of the engineer
 * @method getRole Get the role of the engineer
 * @instance Engineer
 * @example
 * const engineer = new Engineer('John Doe', 1, 'john.doe@mail.com', 'johndoe');
 * engineer.getGithub(); // johndoe
 * engineer.getRole(); // 'Engineer'
 */
class Engineer extends Employee {
  /**
   * Creates an instance of Engineer.
   * @constructor Engineer
   * @param {string} name
   * @param {number} id
   * @param {string} email
   * @param {string} github
   */
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this.role = EnumEmployeeType.ENGINEER;
  }

  /**
   * Get the GitHub username of the engineer
   * @returns {string}
   * @memberof Engineer
   * @method getGithub
   * @instance Engineer
   * @example
   * const engineer = new Engineer('John Doe', 1, 'test@test.com', 'johndoe');
   * engineer.getGithub(); // johndoe
   */
  getGithub() {
    return this.github;
  }

  /**
   * Get the role of the engineer.
   * @returns {EnumEmployeeType.ENGINEER}
   * @throws {Error} If the employee type is invalid
   * @override Employee.getRole
   * @memberof Engineer
   * @method getRole
   * @instance Engineer
   */
  getRole() {
    try {
      if (this.role !== EnumEmployeeType.ENGINEER) {
        throw new Error('Invalid employee type');
      } else {
        return this.role;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Engineer;
