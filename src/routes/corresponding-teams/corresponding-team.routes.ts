import { Router } from 'express';

import { getCorrespondingTeams, getCorrespondingTeam, createCorrespondingTeam, updateCorrespondingTeam, deleteCorrespondingTeam } from '../../controllers/corresponding-teams/corresponding-team.controller.js';

const router = Router();

/**
 * @swagger
 * /api/corresponding-teams:
 *   get:
 *     tags:
 *       - Corresponding Teams
 *     summary: Get all corresponding teams
 *     responses:
 *       200:
 *         description: Corresponding teams retrieved successfully
 */
router.get('/', getCorrespondingTeams);

/**
 * @swagger
 * /api/corresponding-teams/{id}:
 *   get:
 *     tags:
 *       - Corresponding Teams
 *     summary: Get corresponding team by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Corresponding team ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Corresponding team retrieved successfully
 *       404:
 *         description: Corresponding team not found
 */
router.get('/:id', getCorrespondingTeam);

/**
 * @swagger
 * /api/corresponding-teams:
 *   post:
 *     tags:
 *       - Corresponding Teams
 *     summary: Create corresponding team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCorrespondingTeamRequest'
 *     responses:
 *       201:
 *         description: Corresponding team created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createCorrespondingTeam);

/**
 * @swagger
 * /api/corresponding-teams/{id}:
 *   put:
 *     tags:
 *       - Corresponding Teams
 *     summary: Update corresponding team
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
 *             $ref: '#/components/schemas/UpdateCorrespondingTeamRequest'
 *     responses:
 *       200:
 *         description: Corresponding team updated successfully
 *       404:
 *         description: Corresponding team not found
 */
router.put('/:id', updateCorrespondingTeam);

/**
 * @swagger
 * /api/corresponding-teams/{id}:
 *   delete:
 *     tags:
 *       - Corresponding Teams
 *     summary: Delete corresponding team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Corresponding team deleted successfully
 *       404:
 *         description: Corresponding team not found
 */
router.delete('/:id', deleteCorrespondingTeam);

export default router;
