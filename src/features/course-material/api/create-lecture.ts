import { api } from "../../../lib/api-client";
import { Lecture } from "../../../types/api";

/**
 * Create a new lecture linked to a class
 * @param {string} classId
 * @param {string} lectureTitle
 * @param {string} url
 * @returns {promise<Lecture>}
 */
export async function createLecture(
  classId: string | undefined,
  lectureTitle: string,
  url: string,
): Promise<Lecture> {
  try {
    const response = await api.post("/lecture/create", {
      classId,
      lectureTitle,
      url,
    });

    return response.data.newLecture;
  } catch (error) {
    console.error("Error creating lecture", error);
    throw new Error("Failed to create lecture");
  }
}
