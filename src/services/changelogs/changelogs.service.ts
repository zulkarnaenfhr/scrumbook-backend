import * as changelogRepository from '../../repositories/changelogs/changelogs.repository.js';
import { CreateChangelogRequest, UpdateChangelogRequest } from '../../types/changelogs/changelog.js';

export async function getChangelogs() {
	return changelogRepository.findAll();
}

export async function getChangelogById(id: string) {
	const changelog = await changelogRepository.findById(id);

	if (!changelog) {
		throw new Error('Changelog not found');
	}

	return changelog;
}

export async function getChangelogsByProjectId(projectId: string) {
	return changelogRepository.findByProjectId(projectId);
}

export async function createChangelog(data: CreateChangelogRequest) {
	const code = data.code?.trim();
	const log = data.log?.trim();

	if (!code || !log || !data.project_id || !data.created_by?.trim() || !data.updated_by?.trim()) {
		throw new Error('Required field missing');
	}

	return changelogRepository.create({
		...data,
		code,
		log,
	});
}

export async function updateChangelog(id: string, data: UpdateChangelogRequest) {
	const existingChangelog = await changelogRepository.findById(id);

	if (!existingChangelog) {
		throw new Error('Changelog not found');
	}

	if (data.code) {
		data.code = data.code.trim();
	}

	if (data.log) {
		data.log = data.log.trim();
	}

	return changelogRepository.update(id, data);
}

export async function deleteChangelog(id: string) {
	const existingChangelog = await changelogRepository.findById(id);

	if (!existingChangelog) {
		throw new Error('Changelog not found');
	}

	return changelogRepository.deleteChangelog(id);
}
