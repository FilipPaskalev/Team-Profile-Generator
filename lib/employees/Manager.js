const Employee = require('./Employee');
const EnumEmployeeType = require('../enum/EnumEmployeeType');

/**
 * @class Manager
 * @typedef {Manager}
 * @extends {Employee}
 * @property {string} officeNumber The office number of the manager
 * @property {EnumEmployeeType.MANAGER} role The role of the manager
 * @method getOfficeNumber Get the office number of the manager
 * @method getRole Get the role of the manager
 * @instance Manager
 * @example
 * const manager = new Manager('John Doe', 1, 'john.doe@mail.com', '123-456-7890');
 * manager.getOfficeNumber(); // '123-456-7890'
 * manager.getRole();         // 'Manager'
 * manager.getName();         // 'John Doe'
 * manager.getId();           // 1
 * manager.getEmail();        // "john.doe@mail.com"
 */
class Manager extends Employee {
  /**
   * Creates an instance of Manager.
   * @constructor Manager
   * @param {string} name
   * @param {number} id
   * @param {string} email
   * @param {string} officeNumbers
   */
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = EnumEmployeeType.MANAGER;
  }

  /**
   * Get the office number of the manager.
   * @returns {string}
   * @memberof Manager
   * @method getOfficeNumber
   * @instance Manager
   * @example
   * const manager = new Manager('John Doe', 1, 'john.doe@mail.com', '123-456-7890');
   * manager.getOfficeNumber(); // '123-456-7890'
   */
  getOfficeNumber() {
    return this.officeNumber;
  }

  /**
   * Get the role of the manager.
   * @returns {EnumEmployeeType.MANAGER}
   * @throws {Error} If the employee type is invalid
   * @override Employee.getRole
   * @memberof Manager
   * @method getRole
   * @instance Manager
   * @example
   * const manager = new Manager('John Doe', 1, 'john.doe@mail.com', '123-456-7890');
   * manager.getRole(); // 'Manager'
   * employee.getRole(); // Error: Invalid employee type
   */
  getRole() {
    try {
      if (this.role !== EnumEmployeeType.MANAGER) {
        throw new Error('Invalid employee type');
      } else {
        return this.role;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Manager;
