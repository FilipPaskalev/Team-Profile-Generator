function isNameValid(name) {
  if (name === '') return 'Name cannot be empty';
  if (name.length > 50) return 'Name cannot exceed 50 characters';
  return true;
}

function isIdValid(id) {
  if (id === '') return 'ID cannot be empty';
  if (id.length > 50) return 'ID cannot exceed 50 characters';
  return true;
}

function isEmailValid(email) {
  if (email === '') return 'Email cannot be empty';
  if (email.length > 50) return 'Email cannot exceed 50 characters';
  if (!email.includes('@') || !email.includes('.')) return 'Email must contain an "@" and "." symbols';
  return true;
}

function isGitHubUsernameValid(input) {
  if (input === '') return 'GitHub username cannot be empty';
  if (input.length > 50) return 'GitHub username cannot exceed 50 characters';
  return true;
}

function isOfficeNumberValid(input) {
  if (isNaN(input)) return 'Office number must be a number';
  if (input === '') return 'Office number cannot be empty';
  if (input.length > 50) return 'Office number cannot exceed 50 characters';
  return true;
}

function isSchoolNameValid(input) {
  if (input === '') return 'School cannot be empty';
  if (input.length > 50) return 'School cannot exceed 50 characters';
  return true;
}

module.exports = {
  isNameValid,
  isIdValid,
  isEmailValid,
  isGitHubUsernameValid,
  isOfficeNumberValid,
  isSchoolNameValid,
};
