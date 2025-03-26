import { api } from "../../../lib/api-client";
import { Course } from "../../../types/api";

/**
 * Fetch all Courses tied to a user  
 * @returns {promise<Course[]>}
 */
export async function getCourses(): Promise<Course[]> {
        const response = await api.get("/course/courses");
        console.log(response)
        return response.data.userCourses;
}