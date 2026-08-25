import { Request, Response } from 'express';
import * as projectService from '../../services/projects/projects.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getProjects(req: Request, res: Response) {
	try {
		const projects = await projectService.getProjects();
		if (projects.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		return res.status(200).json(successResponse(projects));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getProject(req: Request, res: Response) {
	try {
		const project = await projectService.getProjectById(req.params.id as string);
		return res.status(200).json(successResponse(project));
	} catch (error) {
		if (error instanceof Error && error.message === 'Project not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createProject(req: Request, res: Response) {
	try {
		const { code, name, summary, target_start, target_end, target_implementation, priority, status, color, created_by, updated_by, no_release, business_unit, category, project_owner, organization_id, user_id } = req.body;

		if (!code?.trim() || !name?.trim() || !priority?.trim() || status === undefined || !created_by?.trim() || !updated_by?.trim() || !organization_id || !user_id) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const project = await projectService.createProject({
			code,
			name,
			summary,
			target_start,
			target_end,
			target_implementation,
			priority,
			status,
			color,
			created_by,
			updated_by,
			no_release,
			business_unit,
			category,
			project_owner,
			organization_id,
			user_id,
		});
		return res.status(201).json(successResponse(project));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateProject(req: Request, res: Response) {
	try {
		const project = await projectService.updateProject(req.params.id as string, req.body);
		return res.status(200).json(successResponse(project));
	} catch (error) {
		if (error instanceof Error && error.message === 'Project not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteProject(req: Request, res: Response) {
	try {
		const project = await projectService.deleteProject(req.params.id as string);
		return res.status(200).json(successResponse(project));
	} catch (error) {
		if (error instanceof Error && error.message === 'Project not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
