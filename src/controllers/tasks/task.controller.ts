import { Request, Response } from 'express';
import * as taskService from '../../services/tasks/task.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getTasks(req: Request, res: Response) {
	try {
		const tasks = await taskService.getTasks();
		if (tasks.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		return res.status(200).json(successResponse(tasks));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getTask(req: Request, res: Response) {
	try {
		const task = await taskService.getTaskById(req.params.id as string);
		return res.status(200).json(successResponse(task));
	} catch (error) {
		if (error instanceof Error && error.message === 'Task not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createTask(req: Request, res: Response) {
	try {
		const { project_id, title, detail, user_id, target, priority, created_by, updated_by, status, timeline_id } = req.body;

		if (!title?.trim() || !priority?.trim() || !status?.trim() || !user_id) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const task = await taskService.createTask({
			project_id,
			title,
			detail,
			user_id,
			target,
			priority,
			created_by,
			updated_by,
			status,
			timeline_id,
		});
		return res.status(201).json(successResponse(task));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateTask(req: Request, res: Response) {
	try {
		const task = await taskService.updateTask(req.params.id as string, req.body);
		return res.status(200).json(successResponse(task));
	} catch (error) {
		if (error instanceof Error && error.message === 'Task not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteTask(req: Request, res: Response) {
	try {
		const task = await taskService.deleteTask(req.params.id as string);
		return res.status(200).json(successResponse(task));
	} catch (error) {
		if (error instanceof Error && error.message === 'Task not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
