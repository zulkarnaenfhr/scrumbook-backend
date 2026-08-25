import * as taskRepository from '../../repositories/tasks/task.repository.js';
import { CreateTaskRequest, UpdateTaskRequest } from '../../types/tasks/task.js';

export async function getTasks() {
	return taskRepository.findAll();
}

export async function getTaskById(id: string) {
	const task = await taskRepository.findById(id);

	if (!task) {
		throw new Error('Task not found');
	}

	return task;
}

export async function getTasksByProjectId(projectId: string) {
	return taskRepository.findByProjectId(projectId);
}

export async function getTasksByUserId(userId: string) {
	return taskRepository.findByUserId(userId);
}

export async function getTasksByTimelineId(timelineId: string) {
	return taskRepository.findByTimelineId(timelineId);
}

export async function createTask(data: CreateTaskRequest) {
	const title = data.title?.trim();
	const priority = data.priority?.trim();
	const status = data.status?.trim();

	// user_id wajib eksplisit dari caller — kolom ini punya default
	// gen_random_uuid() di DDL yang tidak menjamin match ke user manapun,
	// jadi tidak boleh dibiarkan kosong sampai ke repository.
	if (!title || !priority || !status || !data.user_id) {
		throw new Error('Required field missing');
	}

	return taskRepository.create({
		...data,
		title,
		priority,
		status,
	});
}

export async function updateTask(id: string, data: UpdateTaskRequest) {
	const existingTask = await taskRepository.findById(id);

	if (!existingTask) {
		throw new Error('Task not found');
	}

	if (data.title) {
		data.title = data.title.trim();
	}

	if (data.priority) {
		data.priority = data.priority.trim();
	}

	if (data.status) {
		data.status = data.status.trim();
	}

	return taskRepository.update(id, data);
}

export async function deleteTask(id: string) {
	const existingTask = await taskRepository.findById(id);

	if (!existingTask) {
		throw new Error('Task not found');
	}

	return taskRepository.deleteTask(id);
}
