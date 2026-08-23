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
 *       400:
 *         description: Data not found
 *       500:
 *         description: Internal server error
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
 *           example: 1
 *     responses:
 *       200:
 *         description: Organization retrieved successfully
 *       400:
 *         description: Invalid organization ID
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getOrganization);

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     tags:
 *       - Organizations
 *     summary: Create an organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrganizationRequest'
 *           example:
 *             name: BCA Digital
 *             code: BCA-DIGITAL
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Required field missing or duplicate data
 *       500:
 *         description: Internal server error
 */
router.post('/', createOrganization);

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     tags:
 *       - Organizations
 *     summary: Update an organization
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrganizationRequest'
 *           example:
 *             name: BCA Digital Updated
 *             code: BCA-DIGITAL
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *       400:
 *         description: Invalid request or duplicate data
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateOrganization);

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     tags:
 *       - Organizations
 *     summary: Delete an organization
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       400:
 *         description: Invalid organization ID
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteOrganization);

export default router;
