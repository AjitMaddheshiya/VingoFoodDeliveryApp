import express from 'express';
import { sendTestEmail } from '../controllers/auth.controllers.js';

const router = express.Router();

// Test email endpoint
router.post('/send-test-email', sendTestEmail);

export default router;
