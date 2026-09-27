import express from 'express';
import {
  getOrders,
  updateOrderStatus,
  getStats,
  getUsers
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.use(protect, admin);

router.route('/orders')
  .get(getOrders);

router.route('/orders/:id')
  .put(updateOrderStatus);

router.route('/stats')
  .get(getStats);

router.route('/users')
  .get(getUsers);

export default router;
