import React, { createContext, useState, ReactNode } from 'react';
import { Lecture } from '../types/api';

interface CurrentLectureContextType {
  lecturesByCourse: Record<number, Lecture[]>
  setLecturesByCourse: React.Dispatch<React.SetStateAction<Record<number, Lecture[]>>>;
}

const LectureByCourseContext = createContext<CurrentLectureContextType | undefined>(undefined);

interface LecturesByCourseProviderProps {
    children: ReactNode;
}

export const LecturesByCourseProvider: React.FC<LecturesByCourseProviderProps> = ({ children }) => {
  
  const [lecturesByCourse, setLecturesByCourse] = useState<Record<number, Lecture[]>>({} as Record<number, Lecture[]>);
  return (
    <LectureByCourseContext.Provider value={{ lecturesByCourse, setLecturesByCourse }}>
      {children}
    </LectureByCourseContext.Provider>
  );
};

export default LectureByCourseContext;