import { Request, Response } from 'express';
import * as projectConstraintService from '../../services/project-constraints/project-constraint.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getProjectConstraints(req: Request, res: Response) {
	try {
		const projectConstraints = await projectConstraintService.getProjectConstraints();
		if (projectConstraints.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		return res.status(200).json(successResponse(projectConstraints));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getProjectConstraint(req: Request, res: Response) {
	try {
		const projectConstraint = await projectConstraintService.getProjectConstraintById(req.params.id as string);
		return res.status(200).json(successResponse(projectConstraint));
	} catch (error) {
		if (error instanceof Error && error.message === 'Project constraint not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createProjectConstraint(req: Request, res: Response) {
	try {
		const { name, start, status, detail, project_id, created_by, updated_by } = req.body;

		if (!name?.trim() || !start || !status?.trim() || !project_id || !created_by?.trim() || !updated_by?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const projectConstraint = await projectConstraintService.createProjectConstraint({
			name,
			start,
			status,
			detail,
			project_id,
			created_by,
			updated_by,
		});
		return res.status(201).json(successResponse(projectConstraint));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateProjectConstraint(req: Request, res: Response) {
	try {
		const projectConstraint = await projectConstraintService.updateProjectConstraint(req.params.id as string, req.body);
		return res.status(200).json(successResponse(projectConstraint));
	} catch (error) {
		if (error instanceof Error && error.message === 'Project constraint not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteProjectConstraint(req: Request, res: Response) {
	try {
		const projectConstraint = await projectConstraintService.deleteProjectConstraint(req.params.id as string);
		return res.status(200).json(successResponse(projectConstraint));
	} catch (error) {
		if (error instanceof Error && error.message === 'Project constraint not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
