import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/lecture", // backend URL
    withCredentials: true, // Include cookies in requests
});

export interface Lecture {
    id: string;
    title: string;
    content?: string;
}


/**
 * Create a new lecture linked to a class
 * @param {string} classId
 * @param {string} lectureTitle
 * @returns {promise<Lecture>}
 */
export async function createLecture(classId: string | undefined, lectureTitle: string): Promise<Lecture> {
    try {
        const response = await api.post('/create', {
            classId,
            lectureTitle
        });

        return response.data.newLecture;
    } catch (error) {
        console.error("Error creating lecture", error);
        throw new Error("Failed to create lecture");
    }
} 

/**
 * Fetch all lectures for a given class
 * @param {string} classId
 * @returns {promise<Lecture[]>}
 */
export async function getLecturesForClass(classId: string): Promise<Lecture[]> {
    try {
        const response = await api.get(`/lectures/${classId}`)

        return response.data.lectures;
    } catch (error) {
        console.error("Error fetching lectures", error);
        throw new Error("Failed to fetch lectures");
    }
}