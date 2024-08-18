url = () => [
    body('url')
        .isURL()
        .withMessage('Please provide a valid URL')
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
}