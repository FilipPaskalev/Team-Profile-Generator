const EmployeeTypeEnum = require("./EmployeeTypeEnum");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return EmployeeTypeEnum.intern.toString();
  }
}

module.exports = Intern;
