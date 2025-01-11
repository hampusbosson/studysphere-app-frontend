import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth", // backend URL
  withCredentials: true, // Include cookies in requests
});

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
  isVerified: boolean;
}

/**
 * Signup a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<User>} Response from the backend
 */
export async function signup(email: string, password: string): Promise<User> {
  try {
    const response = await api.post<ApiResponse<User>>("/signup", {
      email,
      password,
    });
    return response.data.user; // Adjust based on your backend's response structure
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      // Check if backend returned validation errors
      const validationErrors = error.response.data.errors;
      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        throw new Error(validationErrors[0].msg); // Use the first error message
      }
      throw new Error(error.response.data.message || "Signup failed");
    }
    throw new Error("Signup failed");
  }
}

/**
 * Verify user email with OTP
 * @param {string} email - User's email
 * @param {string} otp - One-Time Password sent to the user's email
 * @returns {Promise<boolean>} True if verification succeeds, false otherwise
 */
export async function verifyEmail(
  email: string,
  otp: string,
): Promise<boolean> {
  try {
    const response = await api.post<ApiResponse<null>>("/verify-email", {
      email,
      otp,
    });

    return response.status === 200; // Return true if status is 200 OK
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error(error.response.data.message || "Failed to verify email");
    } else {
      console.error("Failed to verify email");
    }
    return false; // Return false on error
  }
}

/**
 * Resend the OTP to a user's email for email verification.
 * @param {string} email - User's email address
 * @returns {Promise<boolean>} True if OTP was successfully resent, false otherwise
 */
export async function resendOTP(email: string): Promise<boolean> {
  try {
    const response = await api.post<ApiResponse<null>>("/resend-otp", {
      email,
    });

    return response.status === 200; // True if request succeeds
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error(error.response.data.message || "Failed to resend OTP.");
    } else {
      console.error("Failed to resend OTP.");
    }
    return false; // Return false on error
  }
}

/**
 * Login a user
 * @param {string} identifier - User's email or username
 * @param {string} password - User's password
 * @returns {Promise<{ token: string }>} Response from the backend
 */
export async function login(email: string, password: string): Promise< string > {
  try {
    const response = await api.post("/login", { email, password });

    if (response.status === 200) {
      console.log("Login successful!");
    }
    
    console.log(response.data.token);
    return response.data.token;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error("Backend error:", error.response.data.message);
      throw error;
    }
    throw new Error("Login failed");
  }
}

/**
 * Get the user from the current session (via cookies)
 * @returns {Promise<User>} Response from the backend
 */
export async function getUserFromSession(): Promise<User> {
  try {
    const response = await api.get<ApiResponse<User>>("/session");
    console.log(response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || "Failed to fetch user");
    }
    throw new Error("Failed to fetch user");
  }
}
/**
 * Logout user
 * @returns {Promise<void>} Response from the backend
 */
export async function logout(): Promise<void> {
  try {
    await api.post("/logout");
    console.log("Logged out succesfully");
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error(error);
    }
    throw new Error("Failed to logout user");
  }
}

/**
 * Email a user with reset password link
 * @returns {Promise<void>} Response from the backend
 */
export async function sendResetPasswordLink(email: string): Promise<void> {
  try {
    await api.post("/reset-password/request", {
      email,
    });

    console.log("Reset password link sent succesfully");
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error(error);
    }
    throw new Error("Failed to send reset password link");
  }
}

export async function resetPassword(token: string | null, newPassword: string): Promise<void> {
  try {
    await api.post("/reset-password", {
      token,
      newPassword
    });

    console.log("Password reset succesfully");
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error(error);
    }
    throw new Error("Failed to reset password");
  }
}
