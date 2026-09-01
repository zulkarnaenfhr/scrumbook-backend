import { Request, Response } from 'express';
import * as authService from '../../services/auth/auth.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';

import { ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

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
			return res.status(401).json(errorResponse('SCB401001', 'Invalid email or password', 'Email atau password salah'));
		}

		console.error(error);

		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
