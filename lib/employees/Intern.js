const Employee = require("./Employee");
const EnumEmployeeType = require("../enum/EnumEmployeeType");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.role = EnumEmployeeType.INTERN;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return this.role;
  }
}

module.exports = Intern;
