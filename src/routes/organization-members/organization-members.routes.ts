import { Router } from 'express';

import {
	getOrganizationMembers,
	getOrganizationMember,
	getOrganizationMembersByOrganization,
	createOrganizationMember,
	updateOrganizationMember,
	deleteOrganizationMember,
} from '../../controllers/organization-members/organization-members.controller.js';
import { authenticate, authorizeOrganizationLevel, resolveOrganizationIdFromMemberId, requirePermission } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/organization-members:
 *   get:
 *     tags:
 *       - Organization Members
 *     summary: Get all organization members
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization members retrieved successfully
 *       400:
 *         description: Data not found
 */
router.get('/', requirePermission('MEMBER_VIEW'), getOrganizationMembers);

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization member found
 *       404:
 *         description: Organization member not found
 */
router.get('/:id', requirePermission('MEMBER_VIEW'), getOrganizationMember);

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization members retrieved successfully
 */
router.get('/organization/:organizationId', requirePermission('MEMBER_VIEW'), getOrganizationMembersByOrganization);

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Organization member created
 *       400:
 *         description: Invalid request
 */
// Only an ADMIN of the target organization can add members.
router.post('/', authorizeOrganizationLevel(['ADMIN']), requirePermission('MEMBER_CREATE'), createOrganizationMember);

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization member updated
 *       404:
 *         description: Organization member not found
 */
// :id here is the membership row itself, so resolve the organization through it.
router.put('/:id', authorizeOrganizationLevel(['ADMIN'], resolveOrganizationIdFromMemberId), requirePermission('MEMBER_UPDATE'), updateOrganizationMember);

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization member deleted
 *       404:
 *         description: Organization member not found
 */
router.delete('/:id', authorizeOrganizationLevel(['ADMIN'], resolveOrganizationIdFromMemberId), requirePermission('MEMBER_DELETE'), deleteOrganizationMember);

export default router;
