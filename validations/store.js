const { check, validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const checkBody = [
  check('name')
    .notEmpty()
    .withMessage('You need to enter a name.')
    .isLength({min:3}),

  check('cuit')
    .notEmpty()
    .withMessage('You need to enter a cuit.'),

    check('currentBalance')
    .notEmpty()
    .withMessage('You need to enter a Balance.')
    .isFloat()
    .withMessage('You need to enter a number'),
    
  check('lastSale')
    .notEmpty()
    .withMessage('You need to enter a date.'),

  check('concept1')
    .notEmpty()
    .withMessage('You need to enter a concept!')
    .isString(),

  check('concept2')
    .notEmpty()
    .withMessage('You need to enter a concept!')
    .isString(),

  check('concept3')
    .notEmpty()
    .withMessage('You need to enter a concept!')
    .isString(),

  check('concept4')
    .notEmpty()
    .withMessage('You need to enter a concept!')
    .isString(),

  check('concept5')
    .notEmpty()
    .withMessage('You need to enter a concept!')
    .isString(),

  check('concept6')
    .notEmpty()
    .withMessage('You need to enter a concept!')
    .isString(),

    errorHandler

];

module.exports = { checkBody };