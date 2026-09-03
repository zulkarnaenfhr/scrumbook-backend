import { logger } from '../../utils/logger.js';
import * as changelogRepository from '../../repositories/changelogs/changelogs.repository.js';
import { CreateChangelogRequest, UpdateChangelogRequest } from '../../types/changelogs/changelog.js';

export async function getChangelogs() {
	logger.debug('[changelogs] getChangelogs called');
	return changelogRepository.findAll();
}

export async function getChangelogById(id: string) {
	logger.debug('[changelogs] getChangelogById called', { id: id });
	const changelog = await changelogRepository.findById(id);

	if (!changelog) {
		throw new Error('Changelog not found');
	}

	return changelog;
}

export async function getChangelogsByProjectId(projectId: string) {
	logger.debug('[changelogs] getChangelogsByProjectId called', { projectId: projectId });
	return changelogRepository.findByProjectId(projectId);
}

export async function createChangelog(data: CreateChangelogRequest) {
	logger.debug('[changelogs] createChangelog called');
	const code = data.code?.trim();
	const log = data.log?.trim();

	if (!code || !log || !data.project_id || !data.created_by?.trim() || !data.updated_by?.trim()) {
		throw new Error('Required field missing');
	}

	logger.debug('[changelogs] repository create');

	return changelogRepository.create({
		...data,
		code,
		log,
	});
}

export async function updateChangelog(id: string, data: UpdateChangelogRequest) {
	logger.debug('[changelogs] updateChangelog called', { id: id });
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

	logger.debug('[changelogs] repository update');

	return changelogRepository.update(id, data);
}

export async function deleteChangelog(id: string) {
	logger.debug('[changelogs] deleteChangelog called', { id: id });
	const existingChangelog = await changelogRepository.findById(id);

	if (!existingChangelog) {
		throw new Error('Changelog not found');
	}

	logger.debug('[changelogs] repository deleteChangelog');

	return changelogRepository.deleteChangelog(id);
}
