import * as userRepository from "../repositories/user.repository.js";
import {
  CreateUserRequest,
  UpdateUserRequest
} from "../types/user.js";

export async function getUsers() {
  return userRepository.findAll();
}

export async function getUserById(id: string) {
  const user = await userRepository.findById(id);
  if (!user) throw new Error("User not found");
  return user;
}

export async function createUser(data: CreateUserRequest) {
  if (!data.email?.trim()) throw new Error("Email is required");
  if (!data.name?.trim()) throw new Error("Name is required");
  if (!data.password_hash?.trim()) throw new Error("Password is required");

  const email = data.email.trim().toLowerCase();
  const name = data.name.trim();
  const password_hash = data.password_hash.trim();

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error("Email already exists");

  return userRepository.create({ email, name, password_hash });
}

export async function updateUser(id: string, data: UpdateUserRequest) {
  const existingUser = await userRepository.findById(id);
  if (!existingUser) throw new Error("User not found");

  if (data.email) {
    const email = data.email.trim().toLowerCase();
    const existingEmail = await userRepository.findByEmail(email);

    if (existingEmail && existingEmail.id !== id) {
      throw new Error("Email already exists");
    }

    data.email = email;
  }

  if (data.name) {
    data.name = data.name.trim();
  }

  return userRepository.update(id, data);
}

export async function deleteUser(id: string) {
  const existingUser = await userRepository.findById(id);
  if (!existingUser) throw new Error("User not found");

  return userRepository.deactivate(id);
}
