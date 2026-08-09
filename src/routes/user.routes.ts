import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by email
 *     parameters:
 *       - $ref: '#/components/parameters/UserEmail'
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:email", getUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           example:
 *             email: fahri@example.com
 *             password_hash: password123
 *             name: Fahri Izzuddin Zulkarnaen
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Email already exists
 */
router.post("/", createUser);

/**
 * @swagger
 * /api/users/{email}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     parameters:
 *       - $ref: '#/components/parameters/UserEmail'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           example:
 *             name: Fahri Izzuddin Zulkarnaen Updated
 *             is_active: true
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already exists
 */
router.put("/:email", updateUser);

/**
 * @swagger
 * /api/users/{email}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Deactivate a user
 *     description: Soft deletes the user by setting is_active to false.
 *     parameters:
 *       - $ref: '#/components/parameters/UserEmail'
 *     responses:
 *       200:
 *         description: User deactivated
 *       404:
 *         description: User not found
 */
router.delete("/:email", deleteUser);

export default router;
