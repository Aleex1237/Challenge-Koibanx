const { check, validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const checkBody = [
  check('email')
    .notEmpty()
    .withMessage('You need to enter an email!')
    .isEmail()
    .withMessage('Please enter a valid email'),

  check('password')
    .notEmpty()
    .withMessage('You need to enter a password!')
    .isLength({ min: 3 })
    .withMessage('The password is invalid. Please enter your password.'),

    errorHandler

];

module.exports = { checkBody };