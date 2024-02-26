const EnumEmployeeType = require('../enum/EnumEmployeeType');

/**
 * Employee class is a base class for all employee types (Manager, Engineer, Intern)
 * @class Employee
 * @typedef {Employee}
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
   */
  getName() {
    return this.name;
  }

  /**
   * Get the id of the employee
   * @returns {number}
   */
  getId() {
    return this.id;
  }

  /**
   * Get the email of the employee
   * @returns {string}
   */
  getEmail() {
    return this.email;
  }

  /**
   * Get the role of the employee. It should return one of the following:
   * - EnumEmployeeType.ENGINEER,
   * - EnumEmployeeType.MANAGER,
   * - EnumEmployeeType.INTERN
   * @throws {Error} If the employee type is invalid
   * @returns {EnumEmployeeType.ENGINEER | EnumEmployeeType.MANAGER | EnumEmployeeType.INTERN}
   */
  getRole() {
    // add validation if employee is different from the enum (excluding EnumEmployeeType.EMPLOYEE)

    try {
      if (this.role === EnumEmployeeType.ENGINEER) {
        return this.role;
      } else if (this.role === EnumEmployeeType.MANAGER) {
        return this.role;
      } else if (this.role === EnumEmployeeType.INTERN) {
        return this.role;
      }
    } catch (error) {
      throw new Error('Invalid employee type');
    }
  }
}

module.exports = Employee;
