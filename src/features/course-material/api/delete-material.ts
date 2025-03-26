import { api } from "../../../lib/api-client";

/**
 * Delete a lecture
 * @param {string} lectureId
 * @returns {promise<void>}
 */
export async function deleteLecture(lectureId: string): Promise<void> {
  try {
    await api.post("/lecture/delete", {
      lectureId,
    });

  } catch (error) {
    console.error("Error fetching lectures", error);
    throw new Error("Failed to fetch lectures");
  }
}