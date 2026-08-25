import { Router } from 'express';

import { getOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization } from '../../controllers/organization/organization.controller.js';

const router = Router();

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     tags:
 *       - Organizations
 *     summary: Get all organizations
 *     responses:
 *       200:
 *         description: Organizations retrieved successfully
 *       404:
 *         description: No organizations found
 */
router.get('/', getOrganizations);

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     tags:
 *       - Organizations
 *     summary: Get organization by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Organization retrieved successfully
 *       404:
 *         description: Organization not found
 */
router.get('/:id', getOrganization);

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     tags:
 *       - Organizations
 *     summary: Create organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrganizationRequest'
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createOrganization);

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     tags:
 *       - Organizations
 *     summary: Update organization
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrganizationRequest'
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *       404:
 *         description: Organization not found
 */
router.put('/:id', updateOrganization);

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     tags:
 *       - Organizations
 *     summary: Delete organization
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 */
router.delete('/:id', deleteOrganization);

export default router;
