import { api } from "../../../lib/api-client";
import { Course } from "../../../types/api";

/**
 * Fetch all Courses tied to a user  
 * @returns {promise<Course[]>}
 */
export async function getCourses(): Promise<Course[]> {
        const response = await api.get("/class/classes");
        return response.data.userClasses;
}