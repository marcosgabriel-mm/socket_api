import express from 'express';
import LogController from '../controllers/logController.js';

const router = express.Router();

router.get('/log', LogController.getUserLog);
router.post('/log', LogController.postUserLog);

export default router;