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
		{
			name: 'Business Units',
			description: 'Business unit management endpoints',
		},
		{
			name: 'Organizations',
			description: 'Organization management endpoints',
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
				required: ['id', 'username', 'email', 'created_at', 'updated_at'],
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
						example: '3562239c-885a-4715-bc5a-41b8c22cf049',
					},
					username: {
						type: 'string',
						example: 'fahri',
						nullable: true,
					},
					email: {
						type: 'string',
						format: 'email',
						example: 'fahri@example.com',
						nullable: true,
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
				required: ['username', 'email'],
				properties: {
					username: {
						type: 'string',
						example: 'fahri',
					},
					email: {
						type: 'string',
						format: 'email',
						example: 'fahri@example.com',
					},
				},
			},

			UpdateUserRequest: {
				type: 'object',
				properties: {
					username: {
						type: 'string',
						example: 'fahri_updated',
					},
					email: {
						type: 'string',
						format: 'email',
						example: 'fahri.updated@example.com',
					},
				},
			},

			BusinessUnit: {
				type: 'object',
				required: ['id', 'name', 'is_active', 'created_at', 'updated_at'],
				properties: {
					id: {
						type: 'integer',
						format: 'int64',
						example: 1,
					},
					name: {
						type: 'string',
						example: 'Digital Banking',
					},
					is_active: {
						type: 'boolean',
						example: true,
					},
					created_at: {
						type: 'string',
						format: 'date-time',
						example: '2026-08-09T08:00:00.000Z',
					},
					updated_at: {
						type: 'string',
						format: 'date-time',
						example: '2026-08-09T08:00:00.000Z',
					},
				},
			},

			CreateBusinessUnitRequest: {
				type: 'object',
				required: ['name'],
				properties: {
					name: {
						type: 'string',
						maxLength: 150,
						example: 'Digital Banking',
					},
				},
			},

			UpdateBusinessUnitRequest: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						maxLength: 150,
						example: 'Digital Banking Updated',
					},
					is_active: {
						type: 'boolean',
						example: true,
					},
				},
			},

			Organization: {
				type: 'object',
				required: ['id', 'name', 'created_at', 'updated_at'],
				properties: {
					id: {
						type: 'integer',
						format: 'int64',
						example: 1,
					},
					name: {
						type: 'string',
						maxLength: 255,
						example: 'BCA Digital',
					},
					code: {
						type: 'string',
						maxLength: 100,
						nullable: true,
						example: 'BCA-DIGITAL',
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

			CreateOrganizationRequest: {
				type: 'object',
				required: ['name'],
				properties: {
					name: {
						type: 'string',
						maxLength: 255,
						example: 'BCA Digital',
					},
					code: {
						type: 'string',
						maxLength: 100,
						example: 'BCA-DIGITAL',
					},
				},
			},

			UpdateOrganizationRequest: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						maxLength: 255,
						example: 'BCA Digital Updated',
					},
					code: {
						type: 'string',
						maxLength: 100,
						nullable: true,
						example: 'BCA-DIGITAL',
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
	apis: ['./src/routes/**/*.ts'],
});
