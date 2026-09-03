import { Router } from 'express';
import { getAuditLogs, getEntityAuditLogs } from '../../controllers/audit-logs/audit-log.controller.js';
import { authenticate, requirePermission } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/audit-logs:
 *   get:
 *     tags:
 *       - Audit Logs
 *     summary: Query the audit trail
 *     description: Optional filters — combine as needed. Without filters, returns the most recent entries across all entities.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: entity
 *         in: query
 *         schema:
 *           type: string
 *         example: project
 *       - name: entity_id
 *         in: query
 *         schema:
 *           type: string
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: action
 *         in: query
 *         schema:
 *           type: string
 *           enum: [CREATE, UPDATE, DELETE]
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 100
 *           maximum: 500
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', requirePermission('AUDIT_LOG_VIEW'), getAuditLogs);

/**
 * @swagger
 * /api/audit-logs/{entity}/{entityId}:
 *   get:
 *     tags:
 *       - Audit Logs
 *     summary: Get the full audit trail for one specific record
 *     description: "e.g. /api/audit-logs/project/12 shows every CREATE/UPDATE/DELETE ever recorded for project 12."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: entity
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: project
 *       - name: entityId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: '12'
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/:entity/:entityId', requirePermission('AUDIT_LOG_VIEW'), getEntityAuditLogs);

export default router;
