const { validationResult } = require("express-validator");

url = () => [
    body('url')
        .isURL()
        .withMessage('Please provide a valid URL')
];

exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("here");

    return next();
}