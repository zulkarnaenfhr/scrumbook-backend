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

			Flow: {
				type: 'object',
				required: ['id', 'title', 'is_publish', 'created_by', 'updated_by', 'created_at', 'updated_at', 'code', 'user_id', 'project_id'],
				properties: {
					id: { type: 'string', example: '1' },
					node: {
						type: 'array',
						nullable: true,
						items: { type: 'object' },
						example: [{ id: 'n1', type: 'start', position: { x: 0, y: 0 } }],
					},
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time' },
					title: { type: 'string', example: 'Approval Flow' },
					description: { type: 'string', nullable: true, example: 'Loan approval process' },
					is_publish: { type: 'boolean', example: false },
					edge: {
						type: 'array',
						nullable: true,
						items: { type: 'object' },
						example: [{ id: 'e1', source: 'n1', target: 'n2' }],
					},
					code: { type: 'string', example: 'FLOW-001' },
					version: { type: 'integer', nullable: true, example: 1 },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					project_id: { type: 'string', example: '1' },
				},
			},

			CreateFlowRequest: {
				type: 'object',
				required: ['title', 'is_publish', 'created_by', 'updated_by', 'code', 'user_id', 'project_id'],
				properties: {
					node: { type: 'array', items: { type: 'object' }, example: [{ id: 'n1', type: 'start', position: { x: 0, y: 0 } }] },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					title: { type: 'string', example: 'Approval Flow' },
					description: { type: 'string', example: 'Loan approval process' },
					is_publish: { type: 'boolean', example: false },
					edge: { type: 'array', items: { type: 'object' }, example: [{ id: 'e1', source: 'n1', target: 'n2' }] },
					code: { type: 'string', example: 'FLOW-001' },
					version: { type: 'integer', example: 1 },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					project_id: { type: 'string', example: '1' },
				},
			},

			UpdateFlowRequest: {
				type: 'object',
				properties: {
					node: { type: 'array', items: { type: 'object' }, example: [{ id: 'n1', type: 'start', position: { x: 0, y: 0 } }] },
					updated_by: { type: 'string', example: 'fahri' },
					title: { type: 'string', example: 'Approval Flow' },
					description: { type: 'string', example: 'Loan approval process' },
					is_publish: { type: 'boolean', example: true },
					edge: { type: 'array', items: { type: 'object' }, example: [{ id: 'e1', source: 'n1', target: 'n2' }] },
					code: { type: 'string', example: 'FLOW-001' },
					version: { type: 'integer', example: 2 },
				},
			},

			Changelog: {
				type: 'object',
				required: ['id', 'code', 'project_id', 'log', 'created_by', 'updated_by', 'created_at', 'updated_at'],
				properties: {
					id: { type: 'string', example: '1' },
					code: { type: 'string', example: 'CHG-001' },
					project_id: { type: 'string', example: '1' },
					log: { type: 'string', example: 'Fixed login bug on mobile app' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time' },
				},
			},

			CreateChangelogRequest: {
				type: 'object',
				required: ['code', 'project_id', 'log', 'created_by', 'updated_by'],
				properties: {
					code: { type: 'string', example: 'CHG-001' },
					project_id: { type: 'string', example: '1' },
					log: { type: 'string', example: 'Fixed login bug on mobile app' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
				},
			},

			UpdateChangelogRequest: {
				type: 'object',
				properties: {
					code: { type: 'string', example: 'CHG-001' },
					log: { type: 'string', example: 'Fixed login bug on mobile app' },
					updated_by: { type: 'string', example: 'fahri' },
				},
			},

			Access: {
				type: 'object',
				required: ['id', 'item_id', 'view', 'create_permission', 'write', 'delete', 'user_id', 'type', 'username', 'created_at'],
				properties: {
					id: { type: 'string', example: '1' },
					item_id: { type: 'string', example: '1' },
					view: { type: 'boolean', example: true },
					create_permission: { type: 'boolean', example: true },
					write: { type: 'boolean', example: false },
					delete: { type: 'boolean', example: false },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					type: { type: 'string', example: 'project' },
					username: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
				},
			},

			CreateAccessRequest: {
				type: 'object',
				required: ['item_id', 'view', 'create_permission', 'write', 'delete', 'user_id', 'type'],
				properties: {
					item_id: { type: 'string', example: '1' },
					view: { type: 'boolean', example: true },
					create_permission: { type: 'boolean', example: true },
					write: { type: 'boolean', example: false },
					delete: { type: 'boolean', example: false },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					type: { type: 'string', example: 'project' },
					username: { type: 'string', example: 'fahri' },
				},
			},

			UpdateAccessRequest: {
				type: 'object',
				properties: {
					view: { type: 'boolean', example: true },
					create_permission: { type: 'boolean', example: true },
					write: { type: 'boolean', example: true },
					delete: { type: 'boolean', example: false },
					username: { type: 'string', example: 'fahri' },
				},
			},

			ProjectConstraint: {
				type: 'object',
				required: ['id', 'name', 'start', 'status', 'project_id', 'created_by', 'updated_by', 'created_at', 'updated_at'],
				properties: {
					id: { type: 'string', example: '1' },
					name: { type: 'string', example: 'Regulatory Approval' },
					start: { type: 'string', format: 'date-time' },
					status: { type: 'string', example: 'pending' },
					detail: { type: 'string', nullable: true, example: 'Waiting for OJK approval' },
					project_id: { type: 'string', example: '1' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time' },
				},
			},

			CreateProjectConstraintRequest: {
				type: 'object',
				required: ['name', 'start', 'status', 'project_id', 'created_by', 'updated_by'],
				properties: {
					name: { type: 'string', example: 'Regulatory Approval' },
					start: { type: 'string', format: 'date-time' },
					status: { type: 'string', example: 'pending' },
					detail: { type: 'string', example: 'Waiting for OJK approval' },
					project_id: { type: 'string', example: '1' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
				},
			},

			UpdateProjectConstraintRequest: {
				type: 'object',
				properties: {
					name: { type: 'string', example: 'Regulatory Approval' },
					start: { type: 'string', format: 'date-time' },
					status: { type: 'string', example: 'resolved' },
					detail: { type: 'string', example: 'Waiting for OJK approval' },
					updated_by: { type: 'string', example: 'fahri' },
				},
			},

			Task: {
				type: 'object',
				required: ['id', 'title', 'user_id', 'priority', 'status', 'created_at'],
				properties: {
					id: { type: 'string', example: '1' },
					project_id: { type: 'string', nullable: true, example: '1' },
					title: { type: 'string', example: 'Design database schema' },
					detail: { type: 'string', nullable: true, example: 'Design normalized schema for scrum module' },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					target: { type: 'string', format: 'date-time', nullable: true },
					priority: { type: 'string', example: 'high' },
					created_by: { type: 'string', nullable: true, example: 'fahri' },
					updated_by: { type: 'string', nullable: true, example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time', nullable: true },
					status: { type: 'string', example: 'in_progress' },
					timeline_id: { type: 'string', nullable: true, example: '1' },
				},
			},

			CreateTaskRequest: {
				type: 'object',
				required: ['title', 'user_id', 'priority', 'status'],
				properties: {
					project_id: { type: 'string', example: '1' },
					title: { type: 'string', example: 'Design database schema' },
					detail: { type: 'string', example: 'Design normalized schema for scrum module' },
					user_id: { type: 'string', format: 'uuid', example: '0053d6c6-f44a-4baf-98c1-ce9ab9cccafb' },
					target: { type: 'string', format: 'date-time' },
					priority: { type: 'string', example: 'high' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					status: { type: 'string', example: 'todo' },
					timeline_id: { type: 'string', example: '1' },
				},
			},

			CorrespondingTeam: {
				type: 'object',
				required: ['id', 'project_id', 'name', 'created_by', 'updated_by', 'created_at', 'updated_at', 'code'],
				properties: {
					id: { type: 'string', example: '1' },
					project_id: { type: 'string', example: '1' },
					name: { type: 'string', example: 'Infrastructure Team' },
					pic: { type: 'string', nullable: true, example: 'Budi Santoso' },
					description: { type: 'string', nullable: true, example: 'Handles server provisioning and deployment' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					created_at: { type: 'string', format: 'date-time' },
					updated_at: { type: 'string', format: 'date-time' },
					code: { type: 'string', example: 'CT-001' },
				},
			},

			CreateCorrespondingTeamRequest: {
				type: 'object',
				required: ['project_id', 'name', 'created_by', 'updated_by', 'code'],
				properties: {
					project_id: { type: 'string', example: '1' },
					name: { type: 'string', example: 'Infrastructure Team' },
					pic: { type: 'string', example: 'Budi Santoso' },
					description: { type: 'string', example: 'Handles server provisioning and deployment' },
					created_by: { type: 'string', example: 'fahri' },
					updated_by: { type: 'string', example: 'fahri' },
					code: { type: 'string', example: 'CT-001' },
				},
			},

			UpdateCorrespondingTeamRequest: {
				type: 'object',
				properties: {
					name: { type: 'string', example: 'Infrastructure Team' },
					pic: { type: 'string', example: 'Budi Santoso' },
					description: { type: 'string', example: 'Handles server provisioning and deployment' },
					updated_by: { type: 'string', example: 'fahri' },
					code: { type: 'string', example: 'CT-001' },
				},
			},

			UpdateTaskRequest: {
				type: 'object',
				properties: {
					project_id: { type: 'string', example: '1' },
					title: { type: 'string', example: 'Design database schema' },
					detail: { type: 'string', example: 'Design normalized schema for scrum module' },
					target: { type: 'string', format: 'date-time' },
					priority: { type: 'string', example: 'medium' },
					updated_by: { type: 'string', example: 'fahri' },
					status: { type: 'string', example: 'done' },
					timeline_id: { type: 'string', example: '1' },
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
