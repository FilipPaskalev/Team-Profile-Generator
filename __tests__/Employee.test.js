const Employee = require('../lib/employees/Employee');
const EnumEmployeeType = require('../lib/enum/EnumEmployeeType');

const testEmployeeName = 'Alice';
const testEmployeeId = 100;
const testEmployeeEmail = 'alice@gmail.com';

test('Can instantiate Employee instance', () => {
  const employee = new Employee();

  expect(typeof employee).toBe('object');
});

test('Can set name via constructor arguments', () => {
  const employee = new Employee(testEmployeeName);

  expect(employee.name).toBe(testEmployeeName);
});

test('Can set id via constructor argument', () => {
  const employee = new Employee(testEmployeeName, testEmployeeId);

  expect(employee.id).toBe(testEmployeeId);
});

test('Can set email via constructor argument', () => {
  const employee = new Employee(testEmployeeName, testEmployeeId, testEmployeeEmail);

  expect(employee.email).toBe(testEmployeeEmail);
});

test('Can get name via getName()', () => {
  const employee = new Employee(testEmployeeName);

  expect(employee.getName()).toBe(testEmployeeName);
});

test('Can get id via getId()', () => {
  const employee = new Employee(testEmployeeName, testEmployeeId);

  expect(employee.getId()).toBe(testEmployeeId);
});

test('Can get email via getEmail()', () => {
  const employee = new Employee(testEmployeeName, testEmployeeId, testEmployeeEmail);

  expect(employee.getEmail()).toBe(testEmployeeEmail);
});

test(`getRole() should return "${EnumEmployeeType.EMPLOYEE}"`, () => {
  const employee = new Employee(testEmployeeName, testEmployeeId, testEmployeeEmail);

  expect(employee.getRole()).toBe(EnumEmployeeType.EMPLOYEE);
});
