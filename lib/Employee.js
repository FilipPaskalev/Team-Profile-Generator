const EmployeeTypeEnum = require("./EmployeeTypeEnum");

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = EmployeeTypeEnum.employee;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role.toString();
  }
}

module.exports = Employee;
