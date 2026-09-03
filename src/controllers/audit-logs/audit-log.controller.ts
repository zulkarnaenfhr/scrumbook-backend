import { Request, Response } from 'express';
import * as auditLogService from '../../services/audit-logs/audit-log.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';
import { AuditAction } from '../../types/audit-logs/audit-log.js';

const VALID_ACTIONS: AuditAction[] = ['CREATE', 'UPDATE', 'DELETE'];

export async function getAuditLogs(req: Request, res: Response) {
	try {
		const { entity, entity_id, user_id, action, limit } = req.query;

		const logs = await auditLogService.getAuditLogs({
			entity: typeof entity === 'string' ? entity : undefined,
			entity_id: typeof entity_id === 'string' ? entity_id : undefined,
			user_id: typeof user_id === 'string' ? user_id : undefined,
			action: typeof action === 'string' && VALID_ACTIONS.includes(action as AuditAction) ? (action as AuditAction) : undefined,
			limit: limit ? Number(limit) : undefined,
		});

		return res.status(200).json(successResponse(logs));
	} catch (error) {
		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getEntityAuditLogs(req: Request, res: Response) {
	try {
		const { entity, entityId } = req.params;

		const logs = await auditLogService.getAuditLogs({
			entity: entity as string,
			entity_id: entityId as string,
			limit: 200,
		});

		return res.status(200).json(successResponse(logs));
	} catch (error) {
		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
