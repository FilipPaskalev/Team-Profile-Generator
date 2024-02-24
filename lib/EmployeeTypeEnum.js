class EmployeeTypeEnum {
  static employee = new EmployeeTypeEnum("Employee");
  static manager = new EmployeeTypeEnum("Manager");
  static engineer = new EmployeeTypeEnum("Engineer");
  static intern = new EmployeeTypeEnum("Intern");

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `EmployeeTypeEnum.${this.name}`;
  }
}

module.exports = EmployeeTypeEnum;
