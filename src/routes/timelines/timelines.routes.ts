import { Router } from 'express';

import { getTimelines, getTimeline, createTimeline, updateTimeline, deleteTimeline } from '../../controllers/timelines/timelines.controller.js';

const router = Router();

/**
 * @swagger
 * /api/timelines:
 *   get:
 *     tags:
 *       - Timelines
 *     summary: Get all timelines
 *     responses:
 *       200:
 *         description: Timelines retrieved successfully
 */
router.get('/', getTimelines);

/**
 * @swagger
 * /api/timelines/{id}:
 *   get:
 *     tags:
 *       - Timelines
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
router.get('/:id', getTimeline);

/**
 * @swagger
 * /api/timelines:
 *   post:
 *     tags:
 *       - Timelines
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
router.post('/', createTimeline);

/**
 * @swagger
 * /api/timelines/{id}:
 *   put:
 *     tags:
 *       - Timelines
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
router.put('/:id', updateTimeline);

/**
 * @swagger
 * /api/timelines/{id}:
 *   delete:
 *     tags:
 *       - Timelines
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
router.delete('/:id', deleteTimeline);

export default router;
