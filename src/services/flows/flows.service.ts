import { logger } from '../../utils/logger.js';
import * as flowRepository from '../../repositories/flows/flows.repository.js';
import { CreateFlowRequest, UpdateFlowRequest } from '../../types/flows/flow.js';

export async function getFlows() {
	logger.debug('[flows] getFlows called');
	return flowRepository.findAll();
}

export async function getFlowById(id: string) {
	logger.debug('[flows] getFlowById called', { id: id });
	const flow = await flowRepository.findById(id);

	if (!flow) {
		throw new Error('Flow not found');
	}

	return flow;
}

export async function getFlowsByProjectId(projectId: string) {
	logger.debug('[flows] getFlowsByProjectId called', { projectId: projectId });
	return flowRepository.findByProjectId(projectId);
}

export async function getFlowsByUserId(userId: string) {
	logger.debug('[flows] getFlowsByUserId called', { userId: userId });
	return flowRepository.findByUserId(userId);
}

export async function createFlow(data: CreateFlowRequest) {
	logger.debug('[flows] createFlow called');
	const title = data.title?.trim();
	const code = data.code?.trim();

	if (!title || !code || data.is_publish === undefined || !data.created_by?.trim() || !data.updated_by?.trim() || !data.user_id || !data.project_id) {
		throw new Error('Required field missing');
	}

	logger.debug('[flows] repository create');

	return flowRepository.create({
		...data,
		title,
		code,
	});
}

export async function updateFlow(id: string, data: UpdateFlowRequest) {
	logger.debug('[flows] updateFlow called', { id: id });
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

	logger.debug('[flows] repository update');

	return flowRepository.update(id, data);
}

export async function deleteFlow(id: string) {
	logger.debug('[flows] deleteFlow called', { id: id });
	const existingFlow = await flowRepository.findById(id);

	if (!existingFlow) {
		throw new Error('Flow not found');
	}

	logger.debug('[flows] repository deleteFlow');

	return flowRepository.deleteFlow(id);
}
