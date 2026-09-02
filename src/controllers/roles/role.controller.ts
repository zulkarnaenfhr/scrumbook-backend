import { Request, Response } from 'express';

import * as roleService from '../../services/roles/role.service.js';

import { successResponse, errorResponse } from '../../models/base-response.js';

import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getRoles(req: Request, res: Response) {
	try {
		const roles = await roleService.getRoles();

		if (roles.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		return res.status(200).json(successResponse(roles));
	} catch (error) {
		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getRole(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);

		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const role = await roleService.getRoleById(id);

		return res.status(200).json(successResponse(role));
	} catch (error) {
		if (error instanceof Error && error.message === 'Role not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createRole(req: Request, res: Response) {
	try {
		const { name, description } = req.body;

		if (!name?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const role = await roleService.createRole({
			name,
			description,
		});

		return res.status(201).json(successResponse(role));
	} catch (error) {
		if (error instanceof Error && error.message === 'Role already exists') {
			return res.status(400).json({
				error_code: 'SCB400004',
				error_message: {
					en: 'Role Already Exists',
					id: 'Role Sudah Digunakan',
				},
			});
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateRole(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);

		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const role = await roleService.updateRole(id, req.body);

		return res.status(200).json(successResponse(role));
	} catch (error) {
		if (error instanceof Error && error.message === 'Role not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		if (error instanceof Error && error.message === 'Role already exists') {
			return res.status(400).json({
				error_code: 'SCB400004',
				error_message: {
					en: 'Role Already Exists',
					id: 'Role Sudah Digunakan',
				},
			});
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteRole(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);

		const role = await roleService.deleteRole(id);

		return res.status(200).json(successResponse(role));
	} catch (error) {
		if (error instanceof Error && error.message === 'Role not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
