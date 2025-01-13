import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/class", // backend URL
  withCredentials: true, // Include cookies in requests
});

export interface Class {
    id: string;
    name: string;
}

/**
 * Create a new Class tied to a user  
 * @param {string} className - The name of the class to create
 * @returns {promise<Class>}
 */
export async function createClass(className: string): Promise<Class> {
    try {
        const response = await api.post("/create", {
            className
        });

        return response.data.newClass;
    } catch (error) {
        console.error("Error creating class:", error);
        throw new Error("Failed to create class")
    }
}

/**
 * Fetch all Classes tied to a user  
 * @returns {promise<Class[]>}
 */
export async function getClasses(): Promise<Class[]> {
    try {
        const response = await api.get("/classes");

        return response.data.userClasses;
    } catch (error) {
        console.error("Error fetching classes:", error);
        throw new Error("Failed to fetch classes");
    }
}


