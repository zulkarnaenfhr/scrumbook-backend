import { Request, Response, NextFunction } from 'express';
import * as userService from '../../services/users/user.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR, ERR_STATUS_EMAIL_EXIST } from '../../static/static-response-error-messages.js';

export async function getUsers(req: Request, res: Response) {
	try {
		const users = await userService.getUsers();

		if (users.length === 0) {
			return res.status(400).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		return res.status(200).json(successResponse(users));
	} catch (error) {
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
export async function getUser(req: Request, res: Response) {
	try {
		const user = await userService.getUserByEmail(req.params.email as string);
		if (!user) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		return res.status(200).json(successResponse(user));
	} catch (error) {
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createUser(req: Request, res: Response) {
	try {
		const { email, name, password_hash } = req.body;

		if (!email?.trim() || !name?.trim() || !password_hash?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const user = await userService.createUser({ email, name, password_hash });
		return res.status(201).json(successResponse(user));
	} catch (error) {
		if (error instanceof Error && error.message === 'Email already exists') {
			return res.status(400).json(errorResponse(ERR_STATUS_EMAIL_EXIST.error_code, ERR_STATUS_EMAIL_EXIST.error_message.en, ERR_STATUS_EMAIL_EXIST.error_message.id));
		}
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateUser(req: Request, res: Response) {
	try {
		return res.status(200).json(await userService.updateUser(req.params.email as string, req.body));
	} catch (error) {
		if (error instanceof Error && error.message === 'User not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		return res.status(200).json(await userService.deleteUser(req.params.email as string));
	} catch (error) {
		if (error instanceof Error && error.message === 'User not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
