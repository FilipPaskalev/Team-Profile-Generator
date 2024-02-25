const Intern = require("../lib/employees/Intern");
const EnumEmployeeType = require("../lib/enum/EnumEmployeeType");

test("Can set school via constructor", () => {
  const testValue = "University of Birmingham";
  const employee = new Intern("John", 1, "john@gmail.com", testValue);

  expect(employee.school).toBe(testValue);
});

test(`getRole() should return "${EnumEmployeeType.INTERN}"`, () => {
  const testValue = EnumEmployeeType.INTERN;
  const employee = new Intern("John", 1, "john@gmail.com", "UCLA");

  expect(employee.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "University of Birmingham";
  const employee = new Intern("John", 1, "john@gmail.com", testValue);

  expect(employee.getSchool()).toBe(testValue);
});
