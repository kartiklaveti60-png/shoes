import express from 'express';
import { generateAIOutfit, aiStylistChat, scanFootSize } from '../controllers/aiController.js';

const router = express.Router();

router.post('/outfit', generateAIOutfit);
router.post('/stylist-chat', aiStylistChat);
router.post('/scan-foot', scanFootSize);

export default router;
