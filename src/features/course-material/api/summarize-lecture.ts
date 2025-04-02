import { api } from "../../../lib/api-client";
import { Lecture } from "../../../types/api";

/**
 * Create a new lecture linked to a class
 * @param {string} lectureId
 * @returns {promise<Lecture>}
 */
export async function summarizeLecture(
  lectureId: string,
): Promise<Lecture> {
  try {
    const response = await api.post("/lecture/summarize", {
      lectureId,
    });

    return response.data.updatedLecture;
  } catch (error) {
    console.error("Error summarizing lecture", error);
    throw new Error("Failed to summarize lecture");
  }
}