import { api } from "../../../lib/api-client";
import { Course } from "../../../types/api";

/**
 * Create a new Class tied to a user
 * @param {string} courseName - The name of the class to create
 * @returns {promise<Course>}
 */
export async function createCourse(courseName: string): Promise<Course> {
  const response = await api.post("/course/create", {
    courseName,
  });
  return response.data.newClass;
}
