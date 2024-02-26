function isNameValid(name) {
  if (name === '') return 'Name cannot be empty';
  if (name.length > 50) return 'Name cannot exceed 50 characters';
  return true;
}

function isIdValid(id) {
  if (id === '') return 'ID cannot be empty';
  if (isNaN(id)) return 'ID must be a number';
  if (id > 9999) return 'ID cannot be bigger than 9999';
  if (id < 1) return 'ID cannot be smaller than 1';
  return true;
}

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') return 'Email cannot be empty';
  if (email.length > 50) return 'Email cannot exceed 50 characters';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return true;
}

function isGitHubUsernameValid(input) {
  if (input === '') return 'GitHub username cannot be empty';
  if (input.length > 50) return 'GitHub username cannot exceed 50 characters';
  return true;
}

function isPhoneNumberValid(input) {
  const phoneRegex = /^\d{10}$/;

  if (input === '') return 'Office number cannot be empty';
  if (!phoneRegex.test(input)) return 'Please enter a valid phone number';
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
  isPhoneNumberValid,
  isSchoolNameValid,
};
