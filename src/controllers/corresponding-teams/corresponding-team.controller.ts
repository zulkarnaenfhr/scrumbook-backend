import { Request, Response } from 'express';
import * as correspondingTeamService from '../../services/corresponding-teams/corresponding-team.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getCorrespondingTeams(req: Request, res: Response) {
	try {
		const correspondingTeams = await correspondingTeamService.getCorrespondingTeams();
		if (correspondingTeams.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		return res.status(200).json(successResponse(correspondingTeams));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getCorrespondingTeam(req: Request, res: Response) {
	try {
		const correspondingTeam = await correspondingTeamService.getCorrespondingTeamById(req.params.id as string);
		return res.status(200).json(successResponse(correspondingTeam));
	} catch (error) {
		if (error instanceof Error && error.message === 'Corresponding team not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createCorrespondingTeam(req: Request, res: Response) {
	try {
		const { project_id, name, pic, description, created_by, updated_by, code } = req.body;

		if (!project_id || !name?.trim() || !created_by?.trim() || !updated_by?.trim() || !code?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const correspondingTeam = await correspondingTeamService.createCorrespondingTeam({
			project_id,
			name,
			pic,
			description,
			created_by,
			updated_by,
			code,
		});
		return res.status(201).json(successResponse(correspondingTeam));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateCorrespondingTeam(req: Request, res: Response) {
	try {
		const correspondingTeam = await correspondingTeamService.updateCorrespondingTeam(req.params.id as string, req.body);
		return res.status(200).json(successResponse(correspondingTeam));
	} catch (error) {
		if (error instanceof Error && error.message === 'Corresponding team not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteCorrespondingTeam(req: Request, res: Response) {
	try {
		const correspondingTeam = await correspondingTeamService.deleteCorrespondingTeam(req.params.id as string);
		return res.status(200).json(successResponse(correspondingTeam));
	} catch (error) {
		if (error instanceof Error && error.message === 'Corresponding team not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
