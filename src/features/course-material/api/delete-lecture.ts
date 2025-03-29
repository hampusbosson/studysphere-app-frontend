import { api } from "../../../lib/api-client";

/**
 * Delete a lecture
 * @param {number} lectureId
 * @returns {promise<void>}
 */
export async function deleteLecture(lectureId: number): Promise<void> {
  try {
    await api.post("/lecture/delete", {
      lectureId,
    });

  } catch (error) {
    console.error("Error fetching lectures", error);
    throw new Error("Failed to fetch lectures");
  }
}