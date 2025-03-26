import { api } from "../../../lib/api-client";
import { Lecture } from "../../../types/api";

/**
 * Fetch all lectures for a given class
 * @param {string} classId
 * @returns {promise<Lecture[]>}
 */
export async function getLecturesForClass(classId: string): Promise<Lecture[]> {
  try {
    const response = await api.get(`/lecture/lectures/${classId}`);

    return response.data.lectures;
  } catch (error) {
    console.error("Error fetching lectures", error);
    throw new Error("Failed to fetch lectures");
  }
}