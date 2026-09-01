import { Router } from 'express';
import { login } from '../../controllers/auth/auth.controller.js';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication / Authorization
 *     summary: Login
 *     description: Authenticate a user and generate an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Required field missing
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);

export default router;
