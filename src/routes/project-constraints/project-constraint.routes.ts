import { Router } from 'express';
import { authenticate, requirePermission } from '../../middlewares/auth.middleware.js';

import { getProjectConstraints, getProjectConstraint, createProjectConstraint, updateProjectConstraint, deleteProjectConstraint } from '../../controllers/project-constraints/project-constraint.controller.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/project-constraints:
 *   get:
 *     tags:
 *       - Project Constraints
 *     summary: Get all project constraints
 *     responses:
 *       200:
 *         description: Project constraints retrieved successfully
 */
router.get('/', requirePermission('CONSTRAINT_VIEW'), getProjectConstraints);

/**
 * @swagger
 * /api/project-constraints/{id}:
 *   get:
 *     tags:
 *       - Project Constraints
 *     summary: Get project constraint by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project constraint ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project constraint retrieved successfully
 *       404:
 *         description: Project constraint not found
 */
router.get('/:id', requirePermission('CONSTRAINT_VIEW'), getProjectConstraint);

/**
 * @swagger
 * /api/project-constraints:
 *   post:
 *     tags:
 *       - Project Constraints
 *     summary: Create project constraint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectConstraintRequest'
 *     responses:
 *       201:
 *         description: Project constraint created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', requirePermission('CONSTRAINT_CREATE'), createProjectConstraint);

/**
 * @swagger
 * /api/project-constraints/{id}:
 *   put:
 *     tags:
 *       - Project Constraints
 *     summary: Update project constraint
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
 *             $ref: '#/components/schemas/UpdateProjectConstraintRequest'
 *     responses:
 *       200:
 *         description: Project constraint updated successfully
 *       404:
 *         description: Project constraint not found
 */
router.put('/:id', requirePermission('CONSTRAINT_UPDATE'), updateProjectConstraint);

/**
 * @swagger
 * /api/project-constraints/{id}:
 *   delete:
 *     tags:
 *       - Project Constraints
 *     summary: Delete project constraint
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project constraint deleted successfully
 *       404:
 *         description: Project constraint not found
 */
router.delete('/:id', requirePermission('CONSTRAINT_DELETE'), deleteProjectConstraint);

export default router;
