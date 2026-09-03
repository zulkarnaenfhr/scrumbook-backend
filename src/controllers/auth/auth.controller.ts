import { Request, Response } from 'express';
import * as authService from '../../services/auth/auth.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';

import {
	ERR_STATUS_FIELD_REQUIRED_MISSING,
	ERR_STATUS_INTERNAL_SERVER_ERROR,
	ERR_STATUS_INVALID_CREDENTIALS,
	ERR_STATUS_INVALID_REFRESH_TOKEN,
} from '../../static/static-response-error-messages.js';

export async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		if (!email?.trim() || !password?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const result = await authService.login({
			email,
			password,
		});

		return res.status(200).json(successResponse(result));
	} catch (error) {
		if (error instanceof Error && error.message === 'Invalid email or password') {
			return res.status(401).json(errorResponse(ERR_STATUS_INVALID_CREDENTIALS.error_code, ERR_STATUS_INVALID_CREDENTIALS.error_message.en, ERR_STATUS_INVALID_CREDENTIALS.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function refresh(req: Request, res: Response) {
	try {
		const { refresh_token } = req.body;

		if (!refresh_token?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const result = await authService.refresh(refresh_token);

		return res.status(200).json(successResponse(result));
	} catch (error) {
		if (error instanceof Error && (error.message === 'Invalid or expired refresh token' || error.message === 'Refresh token is required')) {
			return res.status(401).json(errorResponse(ERR_STATUS_INVALID_REFRESH_TOKEN.error_code, ERR_STATUS_INVALID_REFRESH_TOKEN.error_message.en, ERR_STATUS_INVALID_REFRESH_TOKEN.error_message.id));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function logout(req: Request, res: Response) {
	try {
		const { refresh_token } = req.body;

		if (!refresh_token?.trim()) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		await authService.logout(refresh_token);

		return res.status(200).json(successResponse({ message: 'Logged out successfully' }));
	} catch (error) {
		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
