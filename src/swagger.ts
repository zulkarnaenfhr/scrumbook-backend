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

			Project: {
				type: 'object',
				required: ['id', 'code', 'name', 'priority', 'status', 'created_by', 'updated_by', 'created_at', 'updated_at', 'organization_id', 'user_id'],
				properties: {
					id: { type: 'string', example: '1' },
					code: { type: 'string', example: 'PRJ-001' },
					name: { type: 'string', example: 'Mobile Banking Revamp' },
					summary: { type: 'string', nullable: true, example: 'Redesign of mobile banking UX' },
					target_start: { type: 'string', format: 'date-time', nullable: true },
					target_end: { type: 'string', format: 'date-time', nullable: true },
					target_implementation: { type: 'string', format: 'date-time', nullable: true },
					priority: { type: 'string', example: 'high' },
					status: { type: 'integer', example: 1 },
					color: { type: 'string', nullable: true, example: '#FF5733' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time' },
					no_release: { type: 'string', nullable: true, example: 'v1.0.0' },
					business_unit: { type: 'string', nullable: true, example: 'Digital Banking' },
					category: { type: 'string', nullable: true, example: 'Internal' },
					project_owner: { type: 'string', nullable: true, example: 'Fahri' },
					organization_id: { type: 'string', example: '1' },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
				},
			},

			CreateProjectRequest: {
				type: 'object',
				required: ['code', 'name', 'priority', 'status', 'created_by', 'updated_by', 'organization_id', 'user_id'],
				properties: {
					code: { type: 'string', example: 'PRJ-001' },
					name: { type: 'string', example: 'Mobile Banking Revamp' },
					summary: { type: 'string', example: 'Redesign of mobile banking UX' },
					target_start: { type: 'string', format: 'date-time' },
					target_end: { type: 'string', format: 'date-time' },
					target_implementation: { type: 'string', format: 'date-time' },
					priority: { type: 'string', example: 'high' },
					status: { type: 'integer', example: 1 },
					color: { type: 'string', example: '#FF5733' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					no_release: { type: 'string', example: 'v1.0.0' },
					business_unit: { type: 'string', example: 'Digital Banking' },
					category: { type: 'string', example: 'Internal' },
					project_owner: { type: 'string', example: 'Fahri' },
					organization_id: { type: 'string', example: '1' },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
				},
			},

			UpdateProjectRequest: {
				type: 'object',
				properties: {
					code: { type: 'string', example: 'PRJ-001' },
					name: { type: 'string', example: 'Mobile Banking Revamp' },
					summary: { type: 'string', example: 'Redesign of mobile banking UX' },
					target_start: { type: 'string', format: 'date-time' },
					target_end: { type: 'string', format: 'date-time' },
					target_implementation: { type: 'string', format: 'date-time' },
					priority: { type: 'string', example: 'high' },
					status: { type: 'integer', example: 1 },
					color: { type: 'string', example: '#FF5733' },
					updated_by: { type: 'string', example: 'fahri' },
					no_release: { type: 'string', example: 'v1.0.0' },
					business_unit: { type: 'string', example: 'Digital Banking' },
					category: { type: 'string', example: 'Internal' },
					project_owner: { type: 'string', example: 'Fahri' },
				},
			},

			Timeline: {
				type: 'object',
				required: ['id', 'project_id', 'task', 'start', 'end', 'created_by', 'updated_by', 'created_at', 'updated_at', 'code'],
				properties: {
					id: { type: 'string', example: '1' },
					project_id: { type: 'string', example: '1' },
					task: { type: 'string', example: 'API Development' },
					progress: { type: 'integer', nullable: true, example: 60 },
					start: { type: 'string', format: 'date-time' },
					end: { type: 'string', format: 'date-time' },
					color: { type: 'string', nullable: true, example: '#4CAF50' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time' },
					code: { type: 'string', example: 'TL-001' },
				},
			},

			CreateTimelineRequest: {
				type: 'object',
				required: ['project_id', 'task', 'start', 'end', 'created_by', 'updated_by', 'code'],
				properties: {
					project_id: { type: 'string', example: '1' },
					task: { type: 'string', example: 'API Development' },
					progress: { type: 'integer', example: 0 },
					start: { type: 'string', format: 'date-time' },
					end: { type: 'string', format: 'date-time' },
					color: { type: 'string', example: '#4CAF50' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					code: { type: 'string', example: 'TL-001' },
				},
			},

			UpdateTimelineRequest: {
				type: 'object',
				properties: {
					task: { type: 'string', example: 'API Development' },
					progress: { type: 'integer', example: 60 },
					start: { type: 'string', format: 'date-time' },
					end: { type: 'string', format: 'date-time' },
					color: { type: 'string', example: '#4CAF50' },
					updated_by: { type: 'string', example: 'fahri' },
					code: { type: 'string', example: 'TL-001' },
				},
			},

			Document: {
				type: 'object',
				required: ['id', 'code', 'category', 'type', 'created_by', 'updated_by', 'created_at', 'updated_at', 'user_id', 'is_redirect'],
				properties: {
					id: { type: 'string', example: '1' },
					code: { type: 'string', example: 'DOC-001' },
					project_id: { type: 'string', nullable: true, example: '1' },
					category: { type: 'string', example: 'Technical Spec' },
					summary: { type: 'string', nullable: true, example: 'API design overview' },
					content: { type: 'string', nullable: true, example: 'Full document content here...' },
					type: { type: 'string', example: 'markdown' },
					url: { type: 'string', nullable: true, example: 'https://docs.example.com/doc-001' },
					version: { type: 'integer', nullable: true, example: 1 },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time' },
					title: { type: 'string', nullable: true, example: 'API Design Document' },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					is_redirect: { type: 'boolean', example: false },
				},
			},

			CreateDocumentRequest: {
				type: 'object',
				required: ['code', 'category', 'type', 'created_by', 'updated_by', 'user_id'],
				properties: {
					code: { type: 'string', example: 'DOC-001' },
					project_id: { type: 'string', example: '1' },
					category: { type: 'string', example: 'Technical Spec' },
					summary: { type: 'string', example: 'API design overview' },
					content: { type: 'string', example: 'Full document content here...' },
					type: { type: 'string', example: 'markdown' },
					url: { type: 'string', example: 'https://docs.example.com/doc-001' },
					version: { type: 'integer', example: 1 },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					title: { type: 'string', example: 'API Design Document' },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					is_redirect: { type: 'boolean', example: false },
				},
			},

			UpdateDocumentRequest: {
				type: 'object',
				properties: {
					code: { type: 'string', example: 'DOC-001' },
					project_id: { type: 'string', example: '1' },
					category: { type: 'string', example: 'Technical Spec' },
					summary: { type: 'string', example: 'API design overview' },
					content: { type: 'string', example: 'Full document content here...' },
					type: { type: 'string', example: 'markdown' },
					url: { type: 'string', example: 'https://docs.example.com/doc-001' },
					version: { type: 'integer', example: 1 },
					updated_by: { type: 'string', example: 'fahri' },
					title: { type: 'string', example: 'API Design Document' },
					is_redirect: { type: 'boolean', example: false },
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
