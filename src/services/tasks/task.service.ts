import { logger } from '../../utils/logger.js';
import * as taskRepository from '../../repositories/tasks/task.repository.js';
import { CreateTaskRequest, UpdateTaskRequest } from '../../types/tasks/task.js';
import * as auditLogService from '../audit-logs/audit-log.service.js';

const AUDIT_ENTITY = 'task';

export async function getTasks() {
	logger.debug('[task] getTasks called');
	return taskRepository.findAll();
}

export async function getTaskById(id: string) {
	logger.debug('[task] getTaskById called', { id: id });
	const task = await taskRepository.findById(id);

	if (!task) {
		throw new Error('Task not found');
	}

	return task;
}

export async function getTasksByProjectId(projectId: string) {
	logger.debug('[task] getTasksByProjectId called', { projectId: projectId });
	return taskRepository.findByProjectId(projectId);
}

export async function getTasksByUserId(userId: string) {
	logger.debug('[task] getTasksByUserId called', { userId: userId });
	return taskRepository.findByUserId(userId);
}

export async function getTasksByTimelineId(timelineId: string) {
	logger.debug('[task] getTasksByTimelineId called', { timelineId: timelineId });
	return taskRepository.findByTimelineId(timelineId);
}

export async function createTask(data: CreateTaskRequest, actorUserId?: string) {
	logger.debug('[task] createTask called', { actorUserId: actorUserId });
	const title = data.title?.trim();
	const priority = data.priority?.trim();
	const status = data.status?.trim();

	// user_id wajib eksplisit dari caller — kolom ini punya default
	// gen_random_uuid() di DDL yang tidak menjamin match ke user manapun,
	// jadi tidak boleh dibiarkan kosong sampai ke repository.
	if (!title || !priority || !status || !data.user_id) {
		throw new Error('Required field missing');
	}

	const task = await taskRepository.create({
		...data,
		title,
		priority,
		status,
	});

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'CREATE',
		entity: AUDIT_ENTITY,
		entityId: task.id,
		after: task,
	});

	return task;
}

export async function updateTask(id: string, data: UpdateTaskRequest, actorUserId?: string) {
	logger.debug('[task] updateTask called', { id: id, actorUserId: actorUserId });
	const existingTask = await taskRepository.findById(id);

	if (!existingTask) {
		throw new Error('Task not found');
	}

	if (data.title) {
		data.title = data.title.trim();
	}

	if (data.priority) {
		data.priority = data.priority.trim();
	}

	if (data.status) {
		data.status = data.status.trim();
	}

	const updatedTask = await taskRepository.update(id, data);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'UPDATE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingTask,
		after: updatedTask,
	});

	return updatedTask;
}

export async function deleteTask(id: string, actorUserId?: string) {
	logger.debug('[task] deleteTask called', { id: id, actorUserId: actorUserId });
	const existingTask = await taskRepository.findById(id);

	if (!existingTask) {
		throw new Error('Task not found');
	}

	const deletedTask = await taskRepository.deleteTask(id);

	await auditLogService.recordAuditLog({
		userId: actorUserId,
		action: 'DELETE',
		entity: AUDIT_ENTITY,
		entityId: id,
		before: existingTask,
	});

	return deletedTask;
}
