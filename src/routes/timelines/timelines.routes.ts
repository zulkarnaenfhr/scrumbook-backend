import { Router } from 'express';
import { authenticate, requirePermission } from '../../middlewares/auth.middleware.js';

import { getTimelines, getTimeline, createTimeline, updateTimeline, deleteTimeline } from '../../controllers/timelines/timelines.controller.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/timelines:
 *   get:
 *     tags:
 *       - Timeline
 *     summary: Get all timelines
 *     responses:
 *       200:
 *         description: Timelines retrieved successfully
 */
router.get('/', requirePermission('TIMELINE_VIEW'), getTimelines);

/**
 * @swagger
 * /api/timelines/{id}:
 *   get:
 *     tags:
 *       - Timeline
 *     summary: Get timeline by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Timeline ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Timeline retrieved successfully
 *       404:
 *         description: Timeline not found
 */
router.get('/:id', requirePermission('TIMELINE_VIEW'), getTimeline);

/**
 * @swagger
 * /api/timelines:
 *   post:
 *     tags:
 *       - Timeline
 *     summary: Create timeline
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTimelineRequest'
 *     responses:
 *       201:
 *         description: Timeline created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', requirePermission('TIMELINE_CREATE'), createTimeline);

/**
 * @swagger
 * /api/timelines/{id}:
 *   put:
 *     tags:
 *       - Timeline
 *     summary: Update timeline
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
 *             $ref: '#/components/schemas/UpdateTimelineRequest'
 *     responses:
 *       200:
 *         description: Timeline updated successfully
 *       404:
 *         description: Timeline not found
 */
router.put('/:id', requirePermission('TIMELINE_UPDATE'), updateTimeline);

/**
 * @swagger
 * /api/timelines/{id}:
 *   delete:
 *     tags:
 *       - Timeline
 *     summary: Delete timeline
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Timeline deleted successfully
 *       404:
 *         description: Timeline not found
 */
router.delete('/:id', requirePermission('TIMELINE_DELETE'), deleteTimeline);

export default router;
