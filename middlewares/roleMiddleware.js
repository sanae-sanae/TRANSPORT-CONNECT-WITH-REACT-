import createError from 'http-errors';

// Role-based access control
export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(createError(403, 'Unauthorized access'));
  }
  next();
};

// Resource ownership check
export const checkOwnership = (model, field = 'user') => async (req, res, next) => {
  try {
    const resource = await model.findById(req.params.id);
    
    if (!resource) {
      return next(createError(404, 'Resource not found'));
    }
    
    if (resource[field].toString() !== req.user.id.toString()) {
      return next(createError(403, 'Unauthorized access to this resource'));
    }
    
    req.resource = resource;
    next();
  } catch (err) {
    next(err);
  }
};