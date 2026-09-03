import { Router } from 'express';
import { login, refresh, logout } from '../../controllers/auth/auth.controller.js';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication / Authorization
 *     summary: Login
 *     description: Authenticate a user and generate an access token and refresh token.
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

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Authentication / Authorization
 *     summary: Refresh access token
 *     description: Exchanges a valid, unrevoked refresh token for a new access token and refresh token (the old refresh token is revoked).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid or expired refresh token
 *       400:
 *         description: Required field missing
 *       500:
 *         description: Internal server error
 */
router.post('/refresh', refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication / Authorization
 *     summary: Logout
 *     description: Revokes the given refresh token so it can no longer be used to obtain new access tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutRequest'
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       400:
 *         description: Required field missing
 *       500:
 *         description: Internal server error
 */
router.post('/logout', logout);

export default router;
