export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log only server errors
  if (status >= 500) {
    console.error(err.stack);
  }
  
  res.status(status).json({ message });
};