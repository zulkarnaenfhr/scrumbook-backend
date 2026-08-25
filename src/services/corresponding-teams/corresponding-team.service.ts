import * as correspondingTeamRepository from '../../repositories/corresponding-teams/corresponding-team.repository.js';
import { CreateCorrespondingTeamRequest, UpdateCorrespondingTeamRequest } from '../../types/corresponding-teams/corresponding-team.js';

export async function getCorrespondingTeams() {
	return correspondingTeamRepository.findAll();
}

export async function getCorrespondingTeamById(id: string) {
	const correspondingTeam = await correspondingTeamRepository.findById(id);

	if (!correspondingTeam) {
		throw new Error('Corresponding team not found');
	}

	return correspondingTeam;
}

export async function getCorrespondingTeamsByProjectId(projectId: string) {
	return correspondingTeamRepository.findByProjectId(projectId);
}

export async function createCorrespondingTeam(data: CreateCorrespondingTeamRequest) {
	const name = data.name?.trim();
	const code = data.code?.trim();

	if (!name || !code || !data.project_id || !data.created_by?.trim() || !data.updated_by?.trim()) {
		throw new Error('Required field missing');
	}

	return correspondingTeamRepository.create({
		...data,
		name,
		code,
	});
}

export async function updateCorrespondingTeam(id: string, data: UpdateCorrespondingTeamRequest) {
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

	return correspondingTeamRepository.update(id, data);
}

export async function deleteCorrespondingTeam(id: string) {
	const existingCorrespondingTeam = await correspondingTeamRepository.findById(id);

	if (!existingCorrespondingTeam) {
		throw new Error('Corresponding team not found');
	}

	return correspondingTeamRepository.deleteCorrespondingTeam(id);
}
