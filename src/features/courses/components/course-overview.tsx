import React from "react"
import { getCourses } from "../api/get-courses";

const CourseOverview: React.FC = () => {
    // Fetch courses from the database on mount

    return (
        <div>
            <div className="flex flex-col p-8">
                <div>
                    <p className="text-3xl font-semibold">Course Overview</p>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default CourseOverview;