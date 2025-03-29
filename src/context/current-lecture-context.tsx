import React, { createContext, useState, ReactNode } from 'react';
import { Lecture } from '../types/api';

interface CurrentLectureContextType {
  currentLectures: Lecture[];
  setCurrentLectures: React.Dispatch<React.SetStateAction<Lecture[]>>;
}

const CurrentLectureContext = createContext<CurrentLectureContextType | undefined>(undefined);

interface LectureProviderProps {
    children: ReactNode;
}

export const CurrentLectureProvider: React.FC<LectureProviderProps> = ({ children }) => {
  const [currentLectures, setCurrentLectures] = useState<Lecture[]>([]);
  return (
    <CurrentLectureContext.Provider value={{ currentLectures, setCurrentLectures }}>
      {children}
    </CurrentLectureContext.Provider>
  );
};

export default CurrentLectureContext;