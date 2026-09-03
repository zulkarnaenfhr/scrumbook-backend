import { Router } from 'express';
import { authenticate, requirePermission } from '../../middlewares/auth.middleware.js';

import { getChangelogs, getChangelog, createChangelog, updateChangelog, deleteChangelog } from '../../controllers/changelogs/changelogs.controller.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/changelogs:
 *   get:
 *     tags:
 *       - Changelog
 *     summary: Get all changelogs
 *     responses:
 *       200:
 *         description: Changelogs retrieved successfully
 */
router.get('/', requirePermission('CHANGELOG_VIEW'), getChangelogs);

/**
 * @swagger
 * /api/changelogs/{id}:
 *   get:
 *     tags:
 *       - Changelog
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
router.get('/:id', requirePermission('CHANGELOG_VIEW'), getChangelog);

/**
 * @swagger
 * /api/changelogs:
 *   post:
 *     tags:
 *       - Changelog
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
router.post('/', requirePermission('CHANGELOG_CREATE'), createChangelog);

/**
 * @swagger
 * /api/changelogs/{id}:
 *   put:
 *     tags:
 *       - Changelog
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
router.put('/:id', requirePermission('CHANGELOG_UPDATE'), updateChangelog);

/**
 * @swagger
 * /api/changelogs/{id}:
 *   delete:
 *     tags:
 *       - Changelog
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
router.delete('/:id', requirePermission('CHANGELOG_DELETE'), deleteChangelog);

export default router;
