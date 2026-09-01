import { Router } from 'express';
import { getBusinessUnits, getBusinessUnit, createBusinessUnit, updateBusinessUnit, deleteBusinessUnit } from '../../controllers/business-units/business-units.controller.js';

const router = Router();

/**
 * @swagger
 * /api/business-units:
 *   get:
 *     tags:
 *       - Business Unit
 *     summary: Get all business units
 *     responses:
 *       200:
 *         description: Business units retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_schema:
 *                   type: object
 *                   properties:
 *                     error_code:
 *                       type: string
 *                       example: SCB200001
 *                     error_message:
 *                       type: object
 *                       properties:
 *                         en:
 *                           type: string
 *                           example: SUCCESS
 *                         id:
 *                           type: string
 *                           example: SUKSES
 *                 output_schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BusinessUnit'
 *       400:
 *         description: Data not found
 *       500:
 *         description: Internal server error
 */
router.get('/', getBusinessUnits);

/**
 * @swagger
 * /api/business-units/{id}:
 *   get:
 *     tags:
 *       - Business Unit
 *     summary: Get business unit by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Business unit ID
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     responses:
 *       200:
 *         description: Business unit retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_schema:
 *                   type: object
 *                 output_schema:
 *                   $ref: '#/components/schemas/BusinessUnit'
 *       400:
 *         description: Invalid business unit ID
 *       404:
 *         description: Business unit not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getBusinessUnit);

/**
 * @swagger
 * /api/business-units:
 *   post:
 *     tags:
 *       - Business Unit
 *     summary: Create a business unit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBusinessUnitRequest'
 *           example:
 *             name: Scrum Features
 *     responses:
 *       201:
 *         description: Business unit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_schema:
 *                   type: object
 *                 output_schema:
 *                   $ref: '#/components/schemas/BusinessUnit'
 *       400:
 *         description: Required field missing or business unit already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', createBusinessUnit);

/**
 * @swagger
 * /api/business-units/{id}:
 *   put:
 *     tags:
 *       - Business Unit
 *     summary: Update a business unit
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Business unit ID
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBusinessUnitRequest'
 *           example:
 *             name: Scrum Features Updated
 *             is_active: true
 *     responses:
 *       200:
 *         description: Business unit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_schema:
 *                   type: object
 *                 output_schema:
 *                   $ref: '#/components/schemas/BusinessUnit'
 *       400:
 *         description: Invalid request or duplicate business unit
 *       404:
 *         description: Business unit not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateBusinessUnit);

/**
 * @swagger
 * /api/business-units/{id}:
 *   delete:
 *     tags:
 *       - Business Unit
 *     summary: Deactivate a business unit
 *     description: Soft deletes the business unit by setting is_active to false.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Business unit ID
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     responses:
 *       200:
 *         description: Business unit deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_schema:
 *                   type: object
 *                 output_schema:
 *                   $ref: '#/components/schemas/BusinessUnit'
 *       404:
 *         description: Business unit not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteBusinessUnit);

export default router;
