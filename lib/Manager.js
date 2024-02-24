const EmployeeTypeEnum = require("./EmployeeTypeEnum");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return EmployeeTypeEnum.manager.toString();
  }
}

module.exports = Manager;
