import { Router } from 'express';

import { getProjects, getProject, createProject, updateProject, deleteProject } from '../../controllers/projects/projects.controller.js';
import { authenticate, authorizeOrganizationLevel, requirePermission } from '../../middlewares/auth.middleware.js';

const router = Router();

// Every project route requires a logged-in user.
router.use(authenticate);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */
router.get('/', requirePermission('PROJECT_VIEW'), getProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get project by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       404:
 *         description: Project not found
 */
router.get('/:id', requirePermission('PROJECT_VIEW'), getProject);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectRequest'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid request
 */
// ADMIN of the target organization only.
router.post('/', authorizeOrganizationLevel(['ADMIN']), requirePermission('PROJECT_CREATE'), createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update project
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
 *             $ref: '#/components/schemas/UpdateProjectRequest'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 */
// ADMIN or MEMBER of the project's organization.
router.put('/:id', authorizeOrganizationLevel(['ADMIN', 'MEMBER']), requirePermission('PROJECT_UPDATE'), updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete project
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
// ADMIN of the project's organization only.
router.delete('/:id', authorizeOrganizationLevel(['ADMIN']), requirePermission('PROJECT_DELETE'), deleteProject);

export default router;
