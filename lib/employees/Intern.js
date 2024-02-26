const Employee = require('./Employee');
const EnumEmployeeType = require('../enum/EnumEmployeeType');

/**
 * Intern class is a class for all intern employees. It extends the Employee class.
 * @class Intern
 * @typedef {Intern}
 * @extends {Employee}
 * @property {string} school The school of the intern
 * @property {EnumEmployeeType.INTERN} role The role of the intern
 * @method getSchool Get the school of the intern
 * @method getRole Get the role of the intern
 * @instance Intern
 * @example
 * const intern = new Intern('John Doe', 1, 'john.doe@mail.com', 'Harvard');
 * intern.getSchool(); // 'Harvard'
 * intern.getRole(); // 'Intern'
 */
class Intern extends Employee {
  /**
   * Creates an instance of Intern.
   * @constructor Intern
   * @param {string} name
   * @param {number} id
   * @param {string} email
   * @param {string} school
   */
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.role = EnumEmployeeType.INTERN;
  }

  /**
   * Get the school of the intern.
   * @returns {string}
   * @memberof Intern
   * @method getSchool
   * @instance Intern
   * @example
   * const intern = new Intern('John Doe', 1, 'john.doe@mail.com', 'Harvard');
   * intern.getSchool(); // 'Harvard'
   */
  getSchool() {
    return this.school;
  }

  /**
   * Get the role of the intern.
   * @returns {EnumEmployeeType.INTERN}
   * @throws {Error} If the employee type is invalid
   * @override Employee.getRole
   * @memberof Intern
   * @method getRole
   * @instance Intern
   * @example
   * const intern = new Intern('John Doe', 1, 'john.doe@mail.com', 'Harvard');
   * intern.getRole(); // 'Intern'
   */
  getRole() {
    try {
      if (this.role !== EnumEmployeeType.INTERN) throw new Error('Invalid employee type');
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Intern;
