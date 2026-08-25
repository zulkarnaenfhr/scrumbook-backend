import { Request, Response } from 'express';
import * as documentService from '../../services/documents/documents.service.js';
import { successResponse, errorResponse } from '../../models/base-response.js';
import { ERR_STATUS_DATA_NOT_FOUND, ERR_STATUS_FIELD_REQUIRED_MISSING, ERR_STATUS_INTERNAL_SERVER_ERROR } from '../../static/static-response-error-messages.js';

export async function getDocuments(req: Request, res: Response) {
	try {
		const documents = await documentService.getDocuments();
		if (documents.length === 0) {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		return res.status(200).json(successResponse(documents));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function getDocument(req: Request, res: Response) {
	try {
		const document = await documentService.getDocumentById(req.params.id as string);
		return res.status(200).json(successResponse(document));
	} catch (error) {
		if (error instanceof Error && error.message === 'Document not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function createDocument(req: Request, res: Response) {
	try {
		const { code, project_id, category, summary, content, type, url, version, created_by, updated_by, title, user_id, is_redirect } = req.body;

		if (!code?.trim() || !category?.trim() || !type?.trim() || !created_by?.trim() || !updated_by?.trim() || !user_id) {
			return res.status(400).json(errorResponse(ERR_STATUS_FIELD_REQUIRED_MISSING.error_code, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.en, ERR_STATUS_FIELD_REQUIRED_MISSING.error_message.id));
		}

		const document = await documentService.createDocument({
			code,
			project_id,
			category,
			summary,
			content,
			type,
			url,
			version,
			created_by,
			updated_by,
			title,
			user_id,
			is_redirect,
		});
		return res.status(201).json(successResponse(document));
	} catch (error) {
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function updateDocument(req: Request, res: Response) {
	try {
		const document = await documentService.updateDocument(req.params.id as string, req.body);
		return res.status(200).json(successResponse(document));
	} catch (error) {
		if (error instanceof Error && error.message === 'Document not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}

export async function deleteDocument(req: Request, res: Response) {
	try {
		const document = await documentService.deleteDocument(req.params.id as string);
		return res.status(200).json(successResponse(document));
	} catch (error) {
		if (error instanceof Error && error.message === 'Document not found') {
			return res.status(404).json(errorResponse(ERR_STATUS_DATA_NOT_FOUND.error_code, ERR_STATUS_DATA_NOT_FOUND.error_message.en, ERR_STATUS_DATA_NOT_FOUND.error_message.id));
		}
		console.error(error);
		return res.status(500).json(errorResponse(ERR_STATUS_INTERNAL_SERVER_ERROR.error_code, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.en, ERR_STATUS_INTERNAL_SERVER_ERROR.error_message.id));
	}
}
