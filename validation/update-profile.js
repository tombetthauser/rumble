const Validator = require("validator");
const validText = require("./valid-text");

const validateUpdateProfileInput = data => {
  let errors = {};

  data.username = validText(data.username) ? data.username : "";
  data.biography = validText(data.biography) ? data.biography : "";
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isLength(data.username, { min: 6, max: 18 })) {
    errors.username = "Username must be between 6 and 18 chars";
  }

  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = validateUpdateProfileInput;
