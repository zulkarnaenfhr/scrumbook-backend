import { Router } from 'express';
import { authenticate, requirePermission } from '../../middlewares/auth.middleware.js';

import { getFlows, getFlow, createFlow, updateFlow, deleteFlow } from '../../controllers/flows/flows.controller.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/flows:
 *   get:
 *     tags:
 *       - Flow
 *     summary: Get all flows
 *     responses:
 *       200:
 *         description: Flows retrieved successfully
 */
router.get('/', requirePermission('FLOW_VIEW'), getFlows);

/**
 * @swagger
 * /api/flows/{id}:
 *   get:
 *     tags:
 *       - Flow
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
router.get('/:id', requirePermission('FLOW_VIEW'), getFlow);

/**
 * @swagger
 * /api/flows:
 *   post:
 *     tags:
 *       - Flow
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
router.post('/', requirePermission('FLOW_CREATE'), createFlow);

/**
 * @swagger
 * /api/flows/{id}:
 *   put:
 *     tags:
 *       - Flow
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
router.put('/:id', requirePermission('FLOW_UPDATE'), updateFlow);

/**
 * @swagger
 * /api/flows/{id}:
 *   delete:
 *     tags:
 *       - Flow
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
router.delete('/:id', requirePermission('FLOW_DELETE'), deleteFlow);

export default router;
