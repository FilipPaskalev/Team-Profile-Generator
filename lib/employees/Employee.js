const EnumEmployeeType = require('../enum/EnumEmployeeType');

/**
 * Employee class is a base class for all employee types (Manager, Engineer, Intern)
 * @class Employee
 * @typedef {Employee}
 * @property {string} name The name of the employee
 * @property {number} id The id of the employee
 * @property {string} email The email of the employee
 * @property {EnumEmployeeType.EMPLOYEE} role The role of the employee
 * @method getName Get the name of the employee
 * @method getId Get the id of the employee
 * @method getEmail Get the email of the employee
 * @method getRole Get the role of the employee
 * @instance Employee
 */
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = EnumEmployeeType.EMPLOYEE;
  }

  /**
   * Get the name of the employee
   * @returns {string}
   * @memberof Employee
   * @method getName
   * @instance Employee
   */
  getName() {
    return this.name;
  }

  /**
   * Get the id of the employee
   * @returns {number}
   * @memberof Employee
   * @method getId
   * @instance Employee
   */
  getId() {
    return this.id;
  }

  /**
   * Get the email of the employee
   * @returns {string}
   * @memberof Employee
   * @method getEmail
   * @instance Employee
   */
  getEmail() {
    return this.email;
  }

  /**
   * Get the role of the employee
   * @returns {EnumEmployeeType.EMPLOYEE}
   * @throws {Error} If the employee type is invalid
   * @memberof Employee
   * @method getRole
   * @instance Employee
   */
  getRole() {
    return this.role;
  }
}

module.exports = Employee;
