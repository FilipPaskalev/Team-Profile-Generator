const Intern = require('../lib/employees/Intern');
const EnumEmployeeType = require('../lib/enum/EnumEmployeeType');

test('Can set school via constructor', () => {
  const testInternName = 'John';
  const testInternId = 1;
  const testInternEmail = 'john@gmail.com';
  const testInternSchool = 'University of Birmingham';

  const employee = new Intern(testInternName, testInternId, testInternEmail, testInternSchool);

  expect(employee.school).toBe(testInternSchool);
});

test(`getRole() should return "${EnumEmployeeType.INTERN}"`, () => {
  const testInternName = 'John';
  const testInternId = 1;
  const testInternEmail = 'john@gmail.com';

  const employee = new Intern(testInternName, testInternId, testInternEmail, 'UCLA');

  expect(employee.getRole()).toBe(EnumEmployeeType.INTERN);
});

test('Can get school via getSchool()', () => {
  const testInternName = 'John';
  const testInternId = 1;
  const testInternEmail = 'john@gmail.com';
  const testInternSchool = 'University of Birmingham';

  const employee = new Intern(testInternName, testInternId, testInternEmail, testInternSchool);

  expect(employee.getSchool()).toBe(testInternSchool);
});
