import express from 'express';

import authRoute from './auth.route.js';
import userRoute from './user.route.js';

const router = express.Router();

const baseUrl = "api/v1";

router.use(`/${baseUrl}/auth`, authRoute);
router.use(`/${baseUrl}/users`, userRoute);

export default router;