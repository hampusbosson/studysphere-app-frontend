import { api } from "../../../lib/api-client";
import { Course } from "../../../types/api";

/**
 * Delete a course
 * @param {number} courseId
 * @returns {Promise<Course>}
 */
export async function deleteCourse(courseId: number): Promise<Course> {
  const response = await api.post("/course/delete", {
    courseId,
  });

  return response.data.deleteClass;
}
