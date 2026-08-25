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
						example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb',
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
				required: ['id', 'created_at', 'name', 'description', 'created_by', 'updated_by', 'updated_at', 'user_id'],
				properties: {
					id: {
						type: 'integer',
						format: 'int64',
						example: 1,
					},
					created_at: {
						type: 'string',
						format: 'date-time',
					},
					name: {
						type: 'string',
						example: 'Digital Banking',
					},
					description: {
						type: 'string',
						example: 'Digital Banking Organization',
					},
					created_by: {
						type: 'string',
						example: 'fahri',
					},
					updated_by: {
						type: 'string',
						example: 'fahri',
					},
					updated_at: {
						type: 'string',
						format: 'date-time',
					},
					user_id: {
						type: 'string',
						format: 'uuid',
						example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb',
					},
				},
			},

			CreateOrganizationRequest: {
				type: 'object',
				required: ['name', 'description', 'created_by', 'user_id'],
				properties: {
					name: {
						type: 'string',
						example: 'Digital Banking',
					},
					description: {
						type: 'string',
						example: 'Digital Banking Organization',
					},
					created_by: {
						type: 'string',
						example: 'fahri',
					},
					user_id: {
						type: 'string',
						format: 'uuid',
						example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb',
					},
				},
			},

			UpdateOrganizationRequest: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						example: 'Digital Banking Updated',
					},
					description: {
						type: 'string',
						example: 'Updated description',
					},
					updated_by: {
						type: 'string',
						example: 'fahri',
					},
				},
			},

			OrganizationMember: {
				type: 'object',
				required: ['id', 'created_at', 'organization_id', 'user_id', 'level', 'created_by', 'updated_by', 'updated_at'],
				properties: {
					id: {
						type: 'integer',
						format: 'int64',
						example: 1,
					},
					created_at: {
						type: 'string',
						format: 'date-time',
					},
					organization_id: {
						type: 'integer',
						format: 'int64',
						example: 1,
					},
					user_id: {
						type: 'string',
						format: 'uuid',
						example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb',
					},
					level: {
						type: 'string',
						example: 'ADMIN',
					},
					created_by: {
						type: 'string',
						example: 'uler@gmail.com',
					},
					updated_by: {
						type: 'string',
						example: 'uler@gmail.com',
					},
					updated_at: {
						type: 'string',
						format: 'date-time',
					},
					username: {
						type: 'string',
						nullable: true,
						example: 'fahri',
					},
				},
			},

			CreateOrganizationMemberRequest: {
				type: 'object',
				required: ['organization_id', 'user_id', 'level', 'created_by', 'updated_by'],
				properties: {
					organization_id: {
						type: 'integer',
						format: 'int64',
						example: 1,
					},
					user_id: {
						type: 'string',
						format: 'uuid',
						example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb',
					},
					level: {
						type: 'string',
						example: 'ADMIN',
					},
					created_by: {
						type: 'string',
						example: 'uler@gmail.com',
					},
					updated_by: {
						type: 'string',
						example: 'uler@gmail.com',
					},
					username: {
						type: 'string',
						example: 'fahri',
					},
				},
			},

			UpdateOrganizationMemberRequest: {
				type: 'object',
				properties: {
					level: {
						type: 'string',
						example: 'MEMBER',
					},
					updated_by: {
						type: 'string',
						example: 'uler@gmail.com',
					},
					username: {
						type: 'string',
						example: 'fahri',
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
