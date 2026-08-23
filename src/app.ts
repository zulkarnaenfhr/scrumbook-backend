import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import userRoutes from './routes/users/user.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { swaggerSpec } from './swagger.js';
import businessUnitRoutes from './routes/business-units/business-units.routes.js';

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

app.use(errorMiddleware);

export default app;
