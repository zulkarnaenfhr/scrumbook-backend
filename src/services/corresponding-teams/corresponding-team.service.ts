import { logger } from '../../utils/logger.js';
import * as correspondingTeamRepository from '../../repositories/corresponding-teams/corresponding-team.repository.js';
import { CreateCorrespondingTeamRequest, UpdateCorrespondingTeamRequest } from '../../types/corresponding-teams/corresponding-team.js';

export async function getCorrespondingTeams() {
	logger.debug('[corresponding-team] getCorrespondingTeams called');
	return correspondingTeamRepository.findAll();
}

export async function getCorrespondingTeamById(id: string) {
	logger.debug('[corresponding-team] getCorrespondingTeamById called', { id: id });
	const correspondingTeam = await correspondingTeamRepository.findById(id);

	if (!correspondingTeam) {
		throw new Error('Corresponding team not found');
	}

	return correspondingTeam;
}

export async function getCorrespondingTeamsByProjectId(projectId: string) {
	logger.debug('[corresponding-team] getCorrespondingTeamsByProjectId called', { projectId: projectId });
	return correspondingTeamRepository.findByProjectId(projectId);
}

export async function createCorrespondingTeam(data: CreateCorrespondingTeamRequest) {
	logger.debug('[corresponding-team] createCorrespondingTeam called');
	const name = data.name?.trim();
	const code = data.code?.trim();

	if (!name || !code || !data.project_id || !data.created_by?.trim() || !data.updated_by?.trim()) {
		throw new Error('Required field missing');
	}

	logger.debug('[corresponding-team] repository create');

	return correspondingTeamRepository.create({
		...data,
		name,
		code,
	});
}

export async function updateCorrespondingTeam(id: string, data: UpdateCorrespondingTeamRequest) {
	logger.debug('[corresponding-team] updateCorrespondingTeam called', { id: id });
	const existingCorrespondingTeam = await correspondingTeamRepository.findById(id);

	if (!existingCorrespondingTeam) {
		throw new Error('Corresponding team not found');
	}

	if (data.name) {
		data.name = data.name.trim();
	}

	if (data.code) {
		data.code = data.code.trim();
	}

	logger.debug('[corresponding-team] repository update');

	return correspondingTeamRepository.update(id, data);
}

export async function deleteCorrespondingTeam(id: string) {
	logger.debug('[corresponding-team] deleteCorrespondingTeam called', { id: id });
	const existingCorrespondingTeam = await correspondingTeamRepository.findById(id);

	if (!existingCorrespondingTeam) {
		throw new Error('Corresponding team not found');
	}

	logger.debug('[corresponding-team] repository deleteCorrespondingTeam');

	return correspondingTeamRepository.deleteCorrespondingTeam(id);
}
