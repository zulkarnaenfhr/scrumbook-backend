import { Router } from 'express';

import { getTasks, getTask, createTask, updateTask, deleteTask } from '../../controllers/tasks/task.controller.js';
import { authenticate, authorizeOrganizationLevel, requirePermission } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.get('/', requirePermission('TASK_VIEW'), getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get task by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
router.get('/:id', requirePermission('TASK_VIEW'), getTask);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskRequest'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request
 */
// ADMIN or MEMBER of the task's project's organization.
router.post('/', authorizeOrganizationLevel(['ADMIN', 'MEMBER']), requirePermission('TASK_CREATE'), createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Update task
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
 *             $ref: '#/components/schemas/UpdateTaskRequest'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put('/:id', authorizeOrganizationLevel(['ADMIN', 'MEMBER']), requirePermission('TASK_UPDATE'), updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
// Deleting is reserved for ADMIN.
router.delete('/:id', authorizeOrganizationLevel(['ADMIN']), requirePermission('TASK_DELETE'), deleteTask);

export default router;
