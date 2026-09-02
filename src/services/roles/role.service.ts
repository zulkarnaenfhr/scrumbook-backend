import * as roleRepository from '../../repositories/roles/role.repository.js';
import { CreateRoleRequest, UpdateRoleRequest } from '../../types/roles/roles.js';

export async function getRoles() {
	return roleRepository.findAll();
}

export async function getRoleById(id: number) {
	const role = await roleRepository.findById(id);

	if (!role) {
		throw new Error('Role not found');
	}

	return role;
}

export async function createRole(data: CreateRoleRequest) {
	if (!data.name?.trim()) {
		throw new Error('Role name is required');
	}

	const name = data.name.trim().toUpperCase();
	const description = data.description?.trim();

	const existingRole = await roleRepository.findByName(name);

	if (existingRole) {
		throw new Error('Role already exists');
	}

	return roleRepository.create({
		name,
		description,
	});
}

export async function updateRole(id: number, data: UpdateRoleRequest) {
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

	return roleRepository.update(id, data);
}

export async function deleteRole(id: number) {
	const existingRole = await roleRepository.findById(id);

	if (!existingRole) {
		throw new Error('Role not found');
	}

	return roleRepository.deactivate(id);
}
