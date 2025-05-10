import { Request, Response, NextFunction } from 'express';

interface TypedError extends Error {
  statusCode?: number;
  code?: string | number;
  keyValue?: Record<string, any>;
}

export const typeErrorHandler = (
  err: TypedError,
  _req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // Handle TypeScript type errors
  if (err instanceof TypeError) {
    console.error('TypeScript Type Error:', err);
    return res.status(500).json({
      success: false,
      message: 'A type error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: err.message
    });
  }

  // Handle unique field errors
  if (err.code === '11000' || err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(400).json({
      success: false,
      message: `Duplicate value for ${field}`,
      error: `${field} already exists`
    });
  }

  // Pass other errors to the next error handler
  return next(err);
};