import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import userRoutes from './routes/users/user.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { swaggerSpec } from './swagger.js';
import businessUnitRoutes from './routes/business-units/business-units.routes.js';
import organizationRoutes from './routes/organization/organization.routes.js';
import organizationMemberRoutes from './routes/organization-members/organization-members.routes.js';
import timelineRoutes from './routes/timelines/timelines.routes.js';
import documentRoutes from './routes/documents/documents.routes.js';
import flowRoutes from './routes/flows/flows.routes.js';
import projectRoutes from './routes/projects/projects.routes.js';

dotenv.config();

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
	}),
);

app.use(express.json());

app.get('/api/health', (req, res) => {
	res.status(200).json({
		status: 'UP',
		service: 'scrumbook-backend',
	});
});

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		customSiteTitle: 'ScrumBook API Documentation',
	}),
);

app.get('/api-docs.json', (req, res) => {
	res.status(200).json(swaggerSpec);
});

app.use('/api/users', userRoutes);

app.use(
	'/api/business-units',

	businessUnitRoutes,
);

app.use('/api/organizations', organizationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/timelines', timelineRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/flows', flowRoutes);

app.use('/api/organization-members', organizationMemberRoutes);

app.use(errorMiddleware);

export default app;
