import * as projectRepository from '../../repositories/projects/project.repository.js';
import { CreateProjectRequest, UpdateProjectRequest } from '../../types/projects/projects.js';

export async function getProjects() {
	return projectRepository.findAll();
}

export async function getProjectById(id: string) {
	const project = await projectRepository.findById(id);

	if (!project) {
		throw new Error('Project not found');
	}

	return project;
}

export async function getProjectsByOrganizationId(organizationId: string) {
	return projectRepository.findByOrganizationId(organizationId);
}

export async function createProject(data: CreateProjectRequest) {
	const code = data.code?.trim();
	const name = data.name?.trim();
	const priority = data.priority?.trim();

	if (!code || !name || !priority || data.status === undefined || !data.organization_id || !data.user_id) {
		throw new Error('Required field missing');
	}

	return projectRepository.create({
		...data,
		code,
		name,
		priority,
	});
}

export async function updateProject(id: string, data: UpdateProjectRequest) {
	const existingProject = await projectRepository.findById(id);

	if (!existingProject) {
		throw new Error('Project not found');
	}

	if (data.code) {
		data.code = data.code.trim();
	}

	if (data.name) {
		data.name = data.name.trim();
	}

	if (data.priority) {
		data.priority = data.priority.trim();
	}

	return projectRepository.update(id, data);
}

export async function deleteProject(id: string) {
	const existingProject = await projectRepository.findById(id);

	if (!existingProject) {
		throw new Error('Project not found');
	}

	return projectRepository.deleteProject(id);
}
