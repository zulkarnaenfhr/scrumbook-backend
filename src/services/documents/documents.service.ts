import { logger } from '../../utils/logger.js';
import * as documentRepository from '../../repositories/documents/documents.repository.js';
import { CreateDocumentRequest, UpdateDocumentRequest } from '../../types/documents/document.js';

export async function getDocuments() {
	logger.debug('[documents] getDocuments called');
	return documentRepository.findAll();
}

export async function getDocumentById(id: string) {
	logger.debug('[documents] getDocumentById called', { id: id });
	const document = await documentRepository.findById(id);

	if (!document) {
		throw new Error('Document not found');
	}

	return document;
}

export async function getDocumentsByProjectId(projectId: string) {
	logger.debug('[documents] getDocumentsByProjectId called', { projectId: projectId });
	return documentRepository.findByProjectId(projectId);
}

export async function getDocumentsByUserId(userId: string) {
	logger.debug('[documents] getDocumentsByUserId called', { userId: userId });
	return documentRepository.findByUserId(userId);
}

export async function createDocument(data: CreateDocumentRequest) {
	logger.debug('[documents] createDocument called');
	const code = data.code?.trim();
	const category = data.category?.trim();
	const type = data.type?.trim();

	if (!code || !category || !type || !data.created_by?.trim() || !data.updated_by?.trim() || !data.user_id) {
		throw new Error('Required field missing');
	}

	logger.debug('[documents] repository create');

	return documentRepository.create({
		...data,
		code,
		category,
		type,
	});
}

export async function updateDocument(id: string, data: UpdateDocumentRequest) {
	logger.debug('[documents] updateDocument called', { id: id });
	const existingDocument = await documentRepository.findById(id);

	if (!existingDocument) {
		throw new Error('Document not found');
	}

	if (data.code) {
		data.code = data.code.trim();
	}

	if (data.category) {
		data.category = data.category.trim();
	}

	if (data.type) {
		data.type = data.type.trim();
	}

	logger.debug('[documents] repository update');

	return documentRepository.update(id, data);
}

export async function deleteDocument(id: string) {
	logger.debug('[documents] deleteDocument called', { id: id });
	const existingDocument = await documentRepository.findById(id);

	if (!existingDocument) {
		throw new Error('Document not found');
	}

	logger.debug('[documents] repository deleteDocument');

	return documentRepository.deleteDocument(id);
}
