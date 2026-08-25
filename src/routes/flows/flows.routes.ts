import { Router } from 'express';

import { getFlows, getFlow, createFlow, updateFlow, deleteFlow } from '../../controllers/flows/flows.controller.js';

const router = Router();

/**
 * @swagger
 * /api/flows:
 *   get:
 *     tags:
 *       - Flows
 *     summary: Get all flows
 *     responses:
 *       200:
 *         description: Flows retrieved successfully
 */
router.get('/', getFlows);

/**
 * @swagger
 * /api/flows/{id}:
 *   get:
 *     tags:
 *       - Flows
 *     summary: Get flow by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Flow ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Flow retrieved successfully
 *       404:
 *         description: Flow not found
 */
router.get('/:id', getFlow);

/**
 * @swagger
 * /api/flows:
 *   post:
 *     tags:
 *       - Flows
 *     summary: Create flow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFlowRequest'
 *     responses:
 *       201:
 *         description: Flow created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createFlow);

/**
 * @swagger
 * /api/flows/{id}:
 *   put:
 *     tags:
 *       - Flows
 *     summary: Update flow
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
 *             $ref: '#/components/schemas/UpdateFlowRequest'
 *     responses:
 *       200:
 *         description: Flow updated successfully
 *       404:
 *         description: Flow not found
 */
router.put('/:id', updateFlow);

/**
 * @swagger
 * /api/flows/{id}:
 *   delete:
 *     tags:
 *       - Flows
 *     summary: Delete flow
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Flow deleted successfully
 *       404:
 *         description: Flow not found
 */
router.delete('/:id', deleteFlow);

export default router;
