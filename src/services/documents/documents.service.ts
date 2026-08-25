import * as documentRepository from '../../repositories/documents/documents.repository.js';
import { CreateDocumentRequest, UpdateDocumentRequest } from '../../types/documents/document.js';

export async function getDocuments() {
	return documentRepository.findAll();
}

export async function getDocumentById(id: string) {
	const document = await documentRepository.findById(id);

	if (!document) {
		throw new Error('Document not found');
	}

	return document;
}

export async function getDocumentsByProjectId(projectId: string) {
	return documentRepository.findByProjectId(projectId);
}

export async function getDocumentsByUserId(userId: string) {
	return documentRepository.findByUserId(userId);
}

export async function createDocument(data: CreateDocumentRequest) {
	const code = data.code?.trim();
	const category = data.category?.trim();
	const type = data.type?.trim();

	if (!code || !category || !type || !data.created_by?.trim() || !data.updated_by?.trim() || !data.user_id) {
		throw new Error('Required field missing');
	}

	return documentRepository.create({
		...data,
		code,
		category,
		type,
	});
}

export async function updateDocument(id: string, data: UpdateDocumentRequest) {
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

	return documentRepository.update(id, data);
}

export async function deleteDocument(id: string) {
	const existingDocument = await documentRepository.findById(id);

	if (!existingDocument) {
		throw new Error('Document not found');
	}

	return documentRepository.deleteDocument(id);
}
