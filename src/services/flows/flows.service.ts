import * as flowRepository from '../../repositories/flows/flows.repository.js';
import { CreateFlowRequest, UpdateFlowRequest } from '../../types/flows/flow.js';

export async function getFlows() {
	return flowRepository.findAll();
}

export async function getFlowById(id: string) {
	const flow = await flowRepository.findById(id);

	if (!flow) {
		throw new Error('Flow not found');
	}

	return flow;
}

export async function getFlowsByProjectId(projectId: string) {
	return flowRepository.findByProjectId(projectId);
}

export async function getFlowsByUserId(userId: string) {
	return flowRepository.findByUserId(userId);
}

export async function createFlow(data: CreateFlowRequest) {
	const title = data.title?.trim();
	const code = data.code?.trim();

	if (!title || !code || data.is_publish === undefined || !data.created_by?.trim() || !data.updated_by?.trim() || !data.user_id || !data.project_id) {
		throw new Error('Required field missing');
	}

	return flowRepository.create({
		...data,
		title,
		code,
	});
}

export async function updateFlow(id: string, data: UpdateFlowRequest) {
	const existingFlow = await flowRepository.findById(id);

	if (!existingFlow) {
		throw new Error('Flow not found');
	}

	if (data.title) {
		data.title = data.title.trim();
	}

	if (data.code) {
		data.code = data.code.trim();
	}

	return flowRepository.update(id, data);
}

export async function deleteFlow(id: string) {
	const existingFlow = await flowRepository.findById(id);

	if (!existingFlow) {
		throw new Error('Flow not found');
	}

	return flowRepository.deleteFlow(id);
}
