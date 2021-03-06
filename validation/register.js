const Validator = require('validator');
const validText = require('./valid-text');

const validateRegisterInput = data => {
  let errors = {};

  data.username = validText(data.username) ? data.username : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';
  
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (!Validator.isLength(data.username, { min: 3, max: 10 })) {
    errors.username = 'Username must be between 6 and 18 chars';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 3, max: 18 })) {
    errors.password = 'Password must be between 6 and 18 chars';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Password confirmation field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.username = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = validateRegisterInput;