const Employee = require("./Employee");
const EnumEmployeeType = require("../enum/EnumEmployeeType");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this.role = EnumEmployeeType.ENGINEER;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return this.role;
  }
}

module.exports = Engineer;
