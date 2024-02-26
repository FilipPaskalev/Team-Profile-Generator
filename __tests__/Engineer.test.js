const Engineer = require('../lib/employees/Engineer');
const EnumEmployeeType = require('../lib/enum/EnumEmployeeType');

const testEngineerName = 'Muhammad';
const testEngineerId = 1;
const testEngineerEmail = 'muhammad@gmail.com';
const testEngineerGithub = 'GitHubUser';

test('Can set GitHUb account via constructor', () => {
  const employee = new Engineer(testEngineerName, testEngineerId, testEngineerEmail, testEngineerGithub);

  expect(employee.github).toBe(testEngineerGithub);
});

test(`getRole() should return "${EnumEmployeeType.ENGINEER}"`, () => {
  const employee = new Engineer(testEngineerName, testEngineerId, testEngineerEmail, testEngineerGithub);

  expect(employee.getRole()).toBe(EnumEmployeeType.ENGINEER);
});

test('Can get GitHub username via getGithub()', () => {
  const employee = new Engineer(testEngineerName, testEngineerId, testEngineerEmail, testEngineerGithub);

  expect(employee.getGithub()).toBe(testEngineerGithub);
});
