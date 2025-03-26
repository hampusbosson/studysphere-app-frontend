import { api } from "./api-client";
import { User, ApiResponse } from "../types/api";

/**
 * Signup a new user.
 */
export async function signup(email: string, password: string): Promise<User> {
  // The interceptor returns response.data, which conforms to ApiResponse<User>
  const response = await api.post<ApiResponse>("/auth/signup", { email, password });
  return response.data.user;
}

/**
 * Verify user email with OTP.
 * Returns true if no error is thrown.
 */
export async function verifyEmail(email: string, otp: string): Promise<boolean> {
  await api.post<ApiResponse>("/auth/verify-email", { email, otp });
  return true;
}

/**
 * Resend OTP for email verification.
 * Returns true if the request succeeds.
 */
export async function resendOTP(email: string): Promise<boolean> {
  await api.post<ApiResponse>("/auth/resend-otp", { email });
  return true;
}

/**
 * Login a user.
 * Returns the token from the backend.
 */
export async function login(email: string, password: string): Promise<string> {
    const response = await api.post<{ token: string }>("/auth/login", { email, password });
    return response.data.token;
}

/**
 * Get the user from the current session (via cookies).
 */
export async function getUserFromSession(): Promise<User> {
  const response = await api.get<ApiResponse>("/auth/session");
  return response.data.user;
}

/**
 * Logout the user.
 */
export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

/**
 * Send a reset password link to the user's email.
 */
export async function sendResetPasswordLink(email: string): Promise<void> {
  await api.post("/auth/reset-password/request", { email });
}

/**
 * Reset password with the provided token and new password.
 */
export async function resetPassword(token: string | null, newPassword: string): Promise<void> {
  await api.post("/auth/reset-password", { token, newPassword });
}