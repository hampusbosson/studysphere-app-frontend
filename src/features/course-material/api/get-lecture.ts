import { api } from "../../../lib/api-client";
import { Lecture } from "../../../types/api";

const getLecture = async (classId: string, lectureId: string): Promise<Lecture> => {
    try {
        const response = await api.get(`/lecture/lecture/${classId}/${lectureId}`);

        return response.data.lecture;
    } catch (error) {
        console.error("Error fetching lecture", error);
        throw new Error("Failed to fetch lecture");
    }
}

export default getLecture;