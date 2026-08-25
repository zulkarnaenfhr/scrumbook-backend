import { Router } from 'express';

import { getDocuments, getDocument, createDocument, updateDocument, deleteDocument } from '../../controllers/documents/documents.controller.js';

const router = Router();

/**
 * @swagger
 * /api/documents:
 *   get:
 *     tags:
 *       - Documents
 *     summary: Get all documents
 *     responses:
 *       200:
 *         description: Documents retrieved successfully
 */
router.get('/', getDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     tags:
 *       - Documents
 *     summary: Get document by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Document ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document retrieved successfully
 *       404:
 *         description: Document not found
 */
router.get('/:id', getDocument);

/**
 * @swagger
 * /api/documents:
 *   post:
 *     tags:
 *       - Documents
 *     summary: Create document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDocumentRequest'
 *     responses:
 *       201:
 *         description: Document created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     tags:
 *       - Documents
 *     summary: Update document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDocumentRequest'
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       404:
 *         description: Document not found
 */
router.put('/:id', updateDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     tags:
 *       - Documents
 *     summary: Delete document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 */
router.delete('/:id', deleteDocument);

export default router;
