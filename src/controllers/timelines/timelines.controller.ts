import { Request, Response } from 'express';
import * as timelineService from '../../services/timelines/timelines.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getTimelines(req: Request, res: Response) {
	try {
		const timelines = await timelineService.getTimelines();
		if (timelines.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		return res.status(200).json(successResponse(timelines));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getTimeline(req: Request, res: Response) {
	try {
		const timeline = await timelineService.getTimelineById(req.params.id as string);
		return res.status(200).json(successResponse(timeline));
	} catch (error) {
		if (error instanceof Error && error.message === 'Timeline not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createTimeline(req: Request, res: Response) {
	try {
		const { project_id, task, progress, start, end, color, created_by, updated_by, code } = req.body;

		if (!project_id || !task?.trim() || !start || !end || !created_by?.trim() || !updated_by?.trim() || !code?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const timeline = await timelineService.createTimeline({
			project_id,
			task,
			progress,
			start,
			end,
			color,
			created_by,
			updated_by,
			code,
		});
		return res.status(201).json(successResponse(timeline));
	} catch (error) {
		if (error instanceof Error && error.message === 'Start date must be before end date') {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, error.message, error.message));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateTimeline(req: Request, res: Response) {
	try {
		const timeline = await timelineService.updateTimeline(req.params.id as string, req.body);
		return res.status(200).json(successResponse(timeline));
	} catch (error) {
		if (error instanceof Error && error.message === 'Timeline not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		if (error instanceof Error && error.message === 'Start date must be before end date') {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, error.message, error.message));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteTimeline(req: Request, res: Response) {
	try {
		const timeline = await timelineService.deleteTimeline(req.params.id as string);
		return res.status(200).json(successResponse(timeline));
	} catch (error) {
		if (error instanceof Error && error.message === 'Timeline not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
