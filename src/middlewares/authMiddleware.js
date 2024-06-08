import jwt from 'jsonwebtoken';
import { JWT_SECRET_PUBLIC } from '../../constants.js';

/*
* Middleware function to protect admin routes
* */
const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No token provided'
    });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;

  try {
    req.user = jwt.verify(token, JWT_SECRET_PUBLIC);


    /** Authrization section */
    if (req.originalUrl.includes('/admin') && req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Elevate Permission to access this page.'
      });
    }
    /** Authrization ends */

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token'
    });
  }
};

export default authMiddleware;
