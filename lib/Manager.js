const Employee = require("./Employee");
const EnumEmployeeType = require("./EnumEmployeeType");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = EnumEmployeeType.MANAGER;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return this.role;
  }
}

module.exports = Manager;
