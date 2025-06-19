import express from 'express';
import {
  createRequest,
  updateRequestStatus,
  getUserRequests
} from '../controllers/requestController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import Request from '../models/Request.js';
import { checkOwnership } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createRequest);
router.put('/:id/status', 
  authenticate, 
  checkOwnership(Request, 'shipper'),
  updateRequestStatus
);
router.get('/my/requests', authenticate, getUserRequests);

export default router;