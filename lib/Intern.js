const EmployeeTypeEnum = require("./EmployeeTypeEnum");
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.role = EmployeeTypeEnum.intern;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return this.role.toString();
  }
}

module.exports = Intern;
