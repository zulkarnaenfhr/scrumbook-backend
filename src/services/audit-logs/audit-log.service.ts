import { logger } from '../../utils/logger.js';
import * as auditLogRepository from '../../repositories/audit-logs/audit-log.repository.js';
import { AuditAction, AuditLogFilter } from '../../types/audit-logs/audit-log.js';

/**
 * Compares two flat row objects and returns only the fields that changed,
 * so an UPDATE log entry reads like a real diff:
 *   old_value = { status: "TODO" }
 *   new_value = { status: "IN_PROGRESS" }
 * instead of dumping the entire before/after row. Internal bookkeeping
 * columns (updated_at, updated_by) are excluded — they change on every
 * write and would drown out the fields that actually matter.
 */
const IGNORED_DIFF_FIELDS = new Set(['updated_at', 'updated_by', 'created_at']);

function normalize(value: unknown): unknown {
	if (value instanceof Date) {
		return value.toISOString();
	}

	return value;
}

export function diffRows(before: Record<string, unknown>, after: Record<string, unknown>) {
	const oldValue: Record<string, unknown> = {};
	const newValue: Record<string, unknown> = {};

	const keys = new Set([...Object.keys(before), ...Object.keys(after)]);

	for (const key of keys) {
		if (IGNORED_DIFF_FIELDS.has(key)) {
			continue;
		}

		const beforeValue = normalize(before[key]);
		const afterValue = normalize(after[key]);

		if (JSON.stringify(beforeValue) !== JSON.stringify(afterValue)) {
			oldValue[key] = before[key];
			newValue[key] = after[key];
		}
	}

	return { oldValue, newValue };
}

/**
 * Records a single audit entry. Never throws — a logging failure should
 * never take down the actual request that triggered it, it's only
 * surfaced to the console for operators to notice.
 *
 * For UPDATE, pass the full row before/after and this computes the diff
 * for you; if nothing actually changed, no log entry is written.
 */
export async function recordAuditLog(params: { userId: string | null | undefined; action: AuditAction; entity: string; entityId: string | number; before?: Record<string, unknown> | null; after?: Record<string, unknown> | null }) {
	logger.debug('[audit-log] recordAuditLog called');
	try {
		let oldValue: Record<string, unknown> | null = params.before ?? null;
		let newValue: Record<string, unknown> | null = params.after ?? null;

		if (params.action === 'UPDATE') {
			if (!params.before || !params.after) {
				return null;
			}

			const diff = diffRows(params.before, params.after);

			if (Object.keys(diff.newValue).length === 0) {
				// Nothing meaningful changed — skip the no-op log entry.
				return null;
			}

			oldValue = diff.oldValue;
			newValue = diff.newValue;
		}

		return await auditLogRepository.create({
			user_id: params.userId ?? null,
			action: params.action,
			entity: params.entity,
			entity_id: params.entityId,
			old_value: oldValue,
			new_value: newValue,
		});
	} catch (error) {
		console.error('Failed to record audit log:', error);
		return null;
	}
}

export async function getAuditLogs(filter: AuditLogFilter) {
	logger.debug('[audit-log] getAuditLogs called', { filter: filter });
	return auditLogRepository.findAll(filter);
}
