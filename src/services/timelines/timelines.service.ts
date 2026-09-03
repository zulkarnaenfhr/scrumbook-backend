import { logger } from '../../utils/logger.js';
import * as timelineRepository from '../../repositories/timelines/timelines.repository.js';
import { CreateTimelineRequest, UpdateTimelineRequest } from '../../types/timelines/timeline.js';

export async function getTimelines() {
	logger.debug('[timelines] getTimelines called');
	return timelineRepository.findAll();
}

export async function getTimelineById(id: string) {
	logger.debug('[timelines] getTimelineById called', { id: id });
	const timeline = await timelineRepository.findById(id);

	if (!timeline) {
		throw new Error('Timeline not found');
	}

	return timeline;
}

export async function getTimelinesByProjectId(projectId: string) {
	logger.debug('[timelines] getTimelinesByProjectId called', { projectId: projectId });
	return timelineRepository.findByProjectId(projectId);
}

export async function createTimeline(data: CreateTimelineRequest) {
	logger.debug('[timelines] createTimeline called');
	const task = data.task?.trim();
	const code = data.code?.trim();

	if (!task || !code || !data.project_id || !data.start || !data.end || !data.created_by?.trim() || !data.updated_by?.trim()) {
		throw new Error('Required field missing');
	}

	if (new Date(data.start) > new Date(data.end)) {
		throw new Error('Start date must be before end date');
	}

	logger.debug('[timelines] repository create');

	return timelineRepository.create({
		...data,
		task,
		code,
	});
}

export async function updateTimeline(id: string, data: UpdateTimelineRequest) {
	logger.debug('[timelines] updateTimeline called', { id: id });
	const existingTimeline = await timelineRepository.findById(id);

	if (!existingTimeline) {
		throw new Error('Timeline not found');
	}

	if (data.task) {
		data.task = data.task.trim();
	}

	if (data.code) {
		data.code = data.code.trim();
	}

	const start = data.start ?? existingTimeline.start;
	const end = data.end ?? existingTimeline.end;

	if (new Date(start) > new Date(end)) {
		throw new Error('Start date must be before end date');
	}

	logger.debug('[timelines] repository update');

	return timelineRepository.update(id, data);
}

export async function deleteTimeline(id: string) {
	logger.debug('[timelines] deleteTimeline called', { id: id });
	const existingTimeline = await timelineRepository.findById(id);

	if (!existingTimeline) {
		throw new Error('Timeline not found');
	}

	logger.debug('[timelines] repository deleteTimeline');

	return timelineRepository.deleteTimeline(id);
}
