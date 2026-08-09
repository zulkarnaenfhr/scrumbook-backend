export interface User {
  email: string;
  name: string;
  password: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  email: string;
  password_hash: string;
  name: string;
}

export interface UpdateUserRequest {
  email?: string;
  password_hash?: string;
  name?: string;
  is_active?: boolean;
}
