import { api } from "../../../lib/api-client";
import { Course } from "../../../types/api";

/**
 * Rename a course
 * @param {number} courseId 
 * @param {string} newCourseName 
 * @returns {Promise<Class>}
 */
export async function renameCourse(courseId: number, newCourseName: string): Promise<Course> {
        const response = await api.post("/class/rename", {
            courseId,
            newName: newCourseName
        });

        return response.data.updatedClass;
}