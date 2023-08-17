import express from 'express';
const router = express.Router();

import { userRegister } from '../Controllers/actionController.js';

// action routes
router.post('/register', userRegister);
export default router;
