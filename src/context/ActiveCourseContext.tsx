import React, { createContext, useState, ReactNode } from "react";
import { Course } from "../types/api";

interface ActiveCourseContextProps {
    activeCourse: Course | null;
    setActiveCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

const ActiveCourseContext = createContext<ActiveCourseContextProps | undefined>(undefined);

interface ActiveCourseProviderProps {
    children: ReactNode;
    defaultActiveCourse?: Course | null;
}

export const ActiveCourseProvider: React.FC<ActiveCourseProviderProps> = ({ children, defaultActiveCourse = null }) => {
    const [ activeCourse, setActiveCourse ] = useState<Course | null>(defaultActiveCourse);

    return (
        <ActiveCourseContext.Provider value={{ activeCourse, setActiveCourse }}>
            {children}
        </ActiveCourseContext.Provider>
    );
};


export default ActiveCourseContext;