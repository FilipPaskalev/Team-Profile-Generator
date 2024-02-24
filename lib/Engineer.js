const EmployeeTypeEnum = require("./EmployeeTypeEnum");
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this.role = EmployeeTypeEnum.engineer;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return this.role.toString();
  }
}

module.exports = Engineer;
