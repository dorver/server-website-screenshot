import express from 'express';
const router = express.Router();

import { createVideo } from '../controllers/videoController.js';

router.route('/').post(createVideo);

export default router;
