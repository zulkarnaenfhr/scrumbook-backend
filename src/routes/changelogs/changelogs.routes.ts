import { Router } from 'express';

import { getChangelogs, getChangelog, createChangelog, updateChangelog, deleteChangelog } from '../../controllers/changelogs/changelogs.controller.js';

const router = Router();

/**
 * @swagger
 * /api/changelogs:
 *   get:
 *     tags:
 *       - Changelogs
 *     summary: Get all changelogs
 *     responses:
 *       200:
 *         description: Changelogs retrieved successfully
 */
router.get('/', getChangelogs);

/**
 * @swagger
 * /api/changelogs/{id}:
 *   get:
 *     tags:
 *       - Changelogs
 *     summary: Get changelog by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Changelog ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Changelog retrieved successfully
 *       404:
 *         description: Changelog not found
 */
router.get('/:id', getChangelog);

/**
 * @swagger
 * /api/changelogs:
 *   post:
 *     tags:
 *       - Changelogs
 *     summary: Create changelog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChangelogRequest'
 *     responses:
 *       201:
 *         description: Changelog created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createChangelog);

/**
 * @swagger
 * /api/changelogs/{id}:
 *   put:
 *     tags:
 *       - Changelogs
 *     summary: Update changelog
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
 *             $ref: '#/components/schemas/UpdateChangelogRequest'
 *     responses:
 *       200:
 *         description: Changelog updated successfully
 *       404:
 *         description: Changelog not found
 */
router.put('/:id', updateChangelog);

/**
 * @swagger
 * /api/changelogs/{id}:
 *   delete:
 *     tags:
 *       - Changelogs
 *     summary: Delete changelog
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Changelog deleted successfully
 *       404:
 *         description: Changelog not found
 */
router.delete('/:id', deleteChangelog);

export default router;
