import { logger } from '../../utils/logger.js';
import * as roleRepository from '../../repositories/roles/role.repository.js';
import { CreateRoleRequest, UpdateRoleRequest } from '../../types/roles/roles.js';

export async function getRoles() {
	logger.debug('[role] getRoles called');
	return roleRepository.findAll();
}

export async function getRoleById(id: number) {
	logger.debug('[role] getRoleById called', { id: id });
	const role = await roleRepository.findById(id);

	if (!role) {
		throw new Error('Role not found');
	}

	return role;
}

export async function createRole(data: CreateRoleRequest) {
	logger.debug('[role] createRole called');
	if (!data.name?.trim()) {
		throw new Error('Role name is required');
	}

	const name = data.name.trim().toUpperCase();
	const description = data.description?.trim();

	const existingRole = await roleRepository.findByName(name);

	if (existingRole) {
		throw new Error('Role already exists');
	}

	logger.debug('[role] repository create');

	return roleRepository.create({
		name,
		description,
	});
}

export async function updateRole(id: number, data: UpdateRoleRequest) {
	logger.debug('[role] updateRole called', { id: id });
	const existingRole = await roleRepository.findById(id);

	if (!existingRole) {
		throw new Error('Role not found');
	}

	if (data.name) {
		const name = data.name.trim().toUpperCase();

		const existingRoleByName = await roleRepository.findByName(name);

		if (existingRoleByName && existingRoleByName.id !== id) {
			throw new Error('Role already exists');
		}

		data.name = name;
	}

	if (data.description) {
		data.description = data.description.trim();
	}

	logger.debug('[role] repository update');

	return roleRepository.update(id, data);
}

export async function deleteRole(id: number) {
	logger.debug('[role] deleteRole called', { id: id });
	const existingRole = await roleRepository.findById(id);

	if (!existingRole) {
		throw new Error('Role not found');
	}

	logger.debug('[role] repository deactivate');

	return roleRepository.deactivate(id);
}
