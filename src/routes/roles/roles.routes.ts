import { Router } from 'express';
import { getRoles, getRole, createRole, updateRole, deleteRole } from '../../controllers/roles/role.controller.js';

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 */
router.get('/', getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get role by ID
 *     parameters:
 *       - $ref: '#/components/parameters/RoleId'
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
router.get('/:id', getRole);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleRequest'
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Required field missing
 *       409:
 *         description: Role already exists
 */
router.post('/', createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     summary: Update role
 *     parameters:
 *       - $ref: '#/components/parameters/RoleId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleRequest'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 */
router.put('/:id', updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete role
 *     parameters:
 *       - $ref: '#/components/parameters/RoleId'
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete('/:id', deleteRole);

export default router;
