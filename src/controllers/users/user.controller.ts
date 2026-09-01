import { Request, Response } from 'express';

import * as userService from '../../services/users/user.service.js';

import { successResponse, errorResponse } from '../../models/base-response.js';

import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR, ERR_STATUS_EMAIL_EXIST } from '../../static/static-response-error-messages.js';

export async function getUsers(req: Request, res: Response) {
	try {
		const users = await userService.getUsers();

		if (users.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		return res.status(200).json(successResponse(users));
	} catch (error) {
		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getUser(req: Request, res: Response) {
	try {
		const user = await userService.getUserById(req.params.id as string);

		return res.status(200).json(successResponse(user));
	} catch (error) {
		if (error instanceof Error && error.message === 'User not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createUser(req: Request, res: Response) {
	try {
		const { username, email, password } = req.body;

		if (!username?.trim() || !email?.trim() || !password) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const user = await userService.createUser({
			username,
			email,
			password,
		});

		return res.status(201).json(successResponse(user));
	} catch (error) {
		if (error instanceof Error && error.message === 'Email already exists') {
			return res.status(400).json(errorResponse(ERR_STATUS_EMAIL_EXIST.error_code, ERR_STATUS_EMAIL_EXIST.error_message.en, ERR_STATUS_EMAIL_EXIST.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateUser(req: Request, res: Response) {
	try {
		const user = await userService.updateUser(req.params.id as string, req.body);

		return res.status(200).json(successResponse(user));
	} catch (error) {
		if (error instanceof Error && error.message === 'User not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		if (error instanceof Error && error.message === 'Email already exists') {
			return res.status(400).json(errorResponse(ERR_STATUS_EMAIL_EXIST.error_code, ERR_STATUS_EMAIL_EXIST.error_message.en, ERR_STATUS_EMAIL_EXIST.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const user = await userService.deleteUser(req.params.id as string);

		return res.status(200).json(successResponse(user));
	} catch (error) {
		if (error instanceof Error && error.message === 'User not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
