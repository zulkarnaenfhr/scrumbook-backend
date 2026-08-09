import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.3',
	info: {
		title: 'ScrumBook Backend API',
		version: '1.0.0',
		description: 'REST API for the ScrumBook application.',
	},
	servers: [
		{
			url: 'http://localhost:4000',
			description: 'Local development server',
		},
	],
	tags: [
		{
			name: 'System',
			description: 'System endpoints',
		},
		{
			name: 'Users',
			description: 'User management endpoints',
		},
	],
	components: {
		parameters: {
			UserEmail: {
				name: 'email',
				in: 'path',
				required: true,
				description: 'User Email',
				schema: {
					type: 'string',
					format: 'email',
					example: 'fahri@example.com',
				},
			},
		},
		schemas: {
			User: {
				type: 'object',
				required: ['email', 'name', 'password_hash', 'is_active', 'created_at', 'updated_at'],
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
						example: '3562239c-885a-4715-bc5a-41b8c22cf049',
					},
					email: {
						type: 'string',
						format: 'email',
						example: 'uler@gmail.com',
					},
					name: {
						type: 'string',
						example: 'Super User',
					},
					password_hash: {
						type: 'string',
						example: 'Super User',
					},
					is_active: {
						type: 'boolean',
						example: true,
					},
					created_at: {
						type: 'string',
						format: 'date-time',
					},
					updated_at: {
						type: 'string',
						format: 'date-time',
					},
				},
			},
			CreateUserRequest: {
				type: 'object',
				required: ['email', 'name', 'password'],
				properties: {
					email: {
						type: 'string',
						format: 'email',
						example: 'fahri@example.com',
					},
					name: {
						type: 'string',
						example: 'fahri zulkarnaen',
					},
					password: {
						type: 'string',
						example: 'password123',
					},
				},
			},
			UpdateUserRequest: {
				type: 'object',
				properties: {
					email: {
						type: 'string',
						format: 'email',
						example: 'fahri@example.com',
					},
					name: {
						type: 'string',
						example: 'fahri zulkarnaen Updated',
					},
					is_active: {
						type: 'boolean',
						example: true,
					},
				},
			},
			Error: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'User not found',
					},
				},
			},
		},
	},
	paths: {
		'/api/health': {
			get: {
				tags: ['System'],
				summary: 'Health check',
				responses: {
					'200': {
						description: 'API is running',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										status: { type: 'string', example: 'UP' },
										service: { type: 'string', example: 'scrumbook-backend' },
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

export const swaggerSpec = swaggerJSDoc({
	definition: swaggerDefinition,
	apis: ['./src/routes/*.ts'],
});
