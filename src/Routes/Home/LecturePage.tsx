import React from "react";
import { useParams } from "react-router-dom";

const LecturePage: React.FC = () => {
    const { lectureId } = useParams<{ lectureId: string }>();

    return (
        <div>
            <h1>Lecture Details</h1>
            <p>Lecture ID: {lectureId}</p>
        </div>
    )
}

export default LecturePage;