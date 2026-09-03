import { logger } from '../../utils/logger.js';
import * as projectConstraintRepository from '../../repositories/project-constraints/project-constraint.repository.js';
import { CreateProjectConstraintRequest, UpdateProjectConstraintRequest } from '../../types/project-constraints/project-constraint.js';

export async function getProjectConstraints() {
	logger.debug('[project-constraint] getProjectConstraints called');
	return projectConstraintRepository.findAll();
}

export async function getProjectConstraintById(id: string) {
	logger.debug('[project-constraint] getProjectConstraintById called', { id: id });
	const projectConstraint = await projectConstraintRepository.findById(id);

	if (!projectConstraint) {
		throw new Error('Project constraint not found');
	}

	return projectConstraint;
}

export async function getProjectConstraintsByProjectId(projectId: string) {
	logger.debug('[project-constraint] getProjectConstraintsByProjectId called', { projectId: projectId });
	return projectConstraintRepository.findByProjectId(projectId);
}

export async function createProjectConstraint(data: CreateProjectConstraintRequest) {
	logger.debug('[project-constraint] createProjectConstraint called');
	const name = data.name?.trim();
	const status = data.status?.trim();

	if (!name || !status || !data.start || !data.project_id || !data.created_by?.trim() || !data.updated_by?.trim()) {
		throw new Error('Required field missing');
	}

	logger.debug('[project-constraint] repository create');

	return projectConstraintRepository.create({
		...data,
		name,
		status,
	});
}

export async function updateProjectConstraint(id: string, data: UpdateProjectConstraintRequest) {
	logger.debug('[project-constraint] updateProjectConstraint called', { id: id });
	const existingProjectConstraint = await projectConstraintRepository.findById(id);

	if (!existingProjectConstraint) {
		throw new Error('Project constraint not found');
	}

	if (data.name) {
		data.name = data.name.trim();
	}

	if (data.status) {
		data.status = data.status.trim();
	}

	logger.debug('[project-constraint] repository update');

	return projectConstraintRepository.update(id, data);
}

export async function deleteProjectConstraint(id: string) {
	logger.debug('[project-constraint] deleteProjectConstraint called', { id: id });
	const existingProjectConstraint = await projectConstraintRepository.findById(id);

	if (!existingProjectConstraint) {
		throw new Error('Project constraint not found');
	}

	logger.debug('[project-constraint] repository deleteProjectConstraint');

	return projectConstraintRepository.deleteProjectConstraint(id);
}
