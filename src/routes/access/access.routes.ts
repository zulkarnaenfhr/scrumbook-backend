import { Router } from 'express';

import { getAccessList, getAccess, createAccess, updateAccess, deleteAccess } from '../../controllers/access/access.controller.js';

const router = Router();

/**
 * @swagger
 * /api/access:
 *   get:
 *     tags:
 *       - Access
 *     summary: Get all access records
 *     responses:
 *       200:
 *         description: Access records retrieved successfully
 */
router.get('/', getAccessList);

/**
 * @swagger
 * /api/access/{id}:
 *   get:
 *     tags:
 *       - Access
 *     summary: Get access by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Access ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Access retrieved successfully
 *       404:
 *         description: Access not found
 */
router.get('/:id', getAccess);

/**
 * @swagger
 * /api/access:
 *   post:
 *     tags:
 *       - Access
 *     summary: Create access
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccessRequest'
 *     responses:
 *       201:
 *         description: Access created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createAccess);

/**
 * @swagger
 * /api/access/{id}:
 *   put:
 *     tags:
 *       - Access
 *     summary: Update access
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccessRequest'
 *     responses:
 *       200:
 *         description: Access updated successfully
 *       404:
 *         description: Access not found
 */
router.put('/:id', updateAccess);

/**
 * @swagger
 * /api/access/{id}:
 *   delete:
 *     tags:
 *       - Access
 *     summary: Delete access
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Access deleted successfully
 *       404:
 *         description: Access not found
 */
router.delete('/:id', deleteAccess);

export default router;
