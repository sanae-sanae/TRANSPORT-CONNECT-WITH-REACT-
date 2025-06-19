import { body, validationResult } from 'express-validator';
export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    res.status(400).json({ errors: errors.array() });
  };
};
export const userValidationRules = () => [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

export const announcementValidationRules = () => [
  body('departure').trim().notEmpty().withMessage('Departure is required'),
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('maxDimensions.length').isFloat({ min: 0 }).withMessage('Invalid length'),
  body('maxDimensions.width').isFloat({ min: 0 }).withMessage('Invalid width'),
  body('maxDimensions.height').isFloat({ min: 0 }).withMessage('Invalid height'),
  body('cargoType').isIn(['general', 'fragile', 'perishable', 'hazardous', 'oversized']),
  body('availableCapacity').isFloat({ min: 0 }).withMessage('Invalid capacity'),
  body('departureDate').isISO8601().withMessage('Invalid date format')
];
export const requestValidationRules = () => [
  body('announcementId').isMongoId().withMessage('Invalid announcement ID'),
  body('packageDetails.weight').isFloat({ min: 0 }).withMessage('Invalid weight'),
  body('packageDetails.dimensions.length').isFloat({ min: 0 }).withMessage('Invalid length'),
  body('packageDetails.dimensions.width').isFloat({ min: 0 }).withMessage('Invalid width'),
  body('packageDetails.dimensions.height').isFloat({ min: 0 }).withMessage('Invalid height')
];