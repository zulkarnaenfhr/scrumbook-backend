import * as projectConstraintRepository from '../../repositories/project-constraints/project-constraint.repository.js';
import { CreateProjectConstraintRequest, UpdateProjectConstraintRequest } from '../../types/project-constraints/project-constraint.js';

export async function getProjectConstraints() {
	return projectConstraintRepository.findAll();
}

export async function getProjectConstraintById(id: string) {
	const projectConstraint = await projectConstraintRepository.findById(id);

	if (!projectConstraint) {
		throw new Error('Project constraint not found');
	}

	return projectConstraint;
}

export async function getProjectConstraintsByProjectId(projectId: string) {
	return projectConstraintRepository.findByProjectId(projectId);
}

export async function createProjectConstraint(data: CreateProjectConstraintRequest) {
	const name = data.name?.trim();
	const status = data.status?.trim();

	if (!name || !status || !data.start || !data.project_id || !data.created_by?.trim() || !data.updated_by?.trim()) {
		throw new Error('Required field missing');
	}

	return projectConstraintRepository.create({
		...data,
		name,
		status,
	});
}

export async function updateProjectConstraint(id: string, data: UpdateProjectConstraintRequest) {
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

	return projectConstraintRepository.update(id, data);
}

export async function deleteProjectConstraint(id: string) {
	const existingProjectConstraint = await projectConstraintRepository.findById(id);

	if (!existingProjectConstraint) {
		throw new Error('Project constraint not found');
	}

	return projectConstraintRepository.deleteProjectConstraint(id);
}
