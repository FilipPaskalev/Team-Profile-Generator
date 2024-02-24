const EmployeeTypeEnum = require("./EmployeeTypeEnum");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return EmployeeTypeEnum.engineer.toString();
  }
}

module.exports = Engineer;
