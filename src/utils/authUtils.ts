import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/auth'; // Replace with your backend's base URL

// Define a common type for responses if the structure is consistent
interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  user: User;
  message?: string;
}

// User type example (adjust based on your backend response)
interface User {
  id: string;
  email: string;
  username?: string; // Include username
}

/**
 * Signup a new user
 * @param {string} email - User's email
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<User>} Response from the backend
 */
export async function signup(email: string, username: string, password: string): Promise<User> {
  try {
    const response = await axios.post<ApiResponse<User>>(`${BASE_URL}/signup`, { email, username, password });
    return response.data.user; // Adjust based on your backend's response structure
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || 'Signup failed');
    }
    throw new Error('Signup failed');
  }
}

/**
 * Login a user
 * @param {string} identifier - User's email or username
 * @param {string} password - User's password
 * @returns {Promise<{ token: string }>} Response from the backend
 */
export async function login(identifier: string, password: string): Promise<{ token: string }> {
  try {
    const response = await axios.post<ApiResponse<{ token: string }>>(`${BASE_URL}/login`, { identifier, password });
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
}

/**
 * Get the user from the token
 * @param {string} token - JWT token
 * @returns {Promise<User>} Response from the backend
 */
export async function getUserFromToken(token: string): Promise<User> {
  try {
    const response = await axios.get<ApiResponse<User>>(`${BASE_URL}/getUserFromToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || 'Failed to fetch user');
    }
    throw new Error('Failed to fetch user');
  }
}