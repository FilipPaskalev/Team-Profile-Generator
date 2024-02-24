const EmployeeTypeEnum = require("./EmployeeTypeEnum");
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = EmployeeTypeEnum.manager;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return this.role.toString();
  }
}

module.exports = Manager;
