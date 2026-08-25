import { Router } from 'express';

import {
	getOrganizationMembers,
	getOrganizationMember,
	getOrganizationMembersByOrganization,
	createOrganizationMember,
	updateOrganizationMember,
	deleteOrganizationMember,
} from '../../controllers/organization-members/organization-members.controller.js';

const router = Router();

/**
 * @swagger
 * /api/organization-members:
 *   get:
 *     tags:
 *       - Organization Members
 *     summary: Get all organization members
 *     responses:
 *       200:
 *         description: Organization members retrieved successfully
 *       400:
 *         description: Data not found
 */
router.get('/', getOrganizationMembers);

/**
 * @swagger
 * /api/organization-members/{id}:
 *   get:
 *     tags:
 *       - Organization Members
 *     summary: Get organization member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Organization member found
 *       404:
 *         description: Organization member not found
 */
router.get('/:id', getOrganizationMember);

/**
 * @swagger
 * /api/organization-members/organization/{organizationId}:
 *   get:
 *     tags:
 *       - Organization Members
 *     summary: Get members by organization
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Organization members retrieved successfully
 */
router.get('/organization/:organizationId', getOrganizationMembersByOrganization);

/**
 * @swagger
 * /api/organization-members:
 *   post:
 *     tags:
 *       - Organization Members
 *     summary: Add user to organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrganizationMemberRequest'
 *     responses:
 *       201:
 *         description: Organization member created
 *       400:
 *         description: Invalid request
 */
router.post('/', createOrganizationMember);

/**
 * @swagger
 * /api/organization-members/{id}:
 *   put:
 *     tags:
 *       - Organization Members
 *     summary: Update organization member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrganizationMemberRequest'
 *     responses:
 *       200:
 *         description: Organization member updated
 *       404:
 *         description: Organization member not found
 */
router.put('/:id', updateOrganizationMember);

/**
 * @swagger
 * /api/organization-members/{id}:
 *   delete:
 *     tags:
 *       - Organization Members
 *     summary: Delete organization member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Organization member deleted
 *       404:
 *         description: Organization member not found
 */
router.delete('/:id', deleteOrganizationMember);

export default router;
