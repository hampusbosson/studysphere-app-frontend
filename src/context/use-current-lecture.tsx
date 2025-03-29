import { useContext } from "react";
import CurrentLectureContext from "./current-lecture-context";

export const useLectureContext = () => {
    const context = useContext(CurrentLectureContext);
    if (!context) {
      throw new Error('useLectureContext must be used within a LectureProvider');
    }
    return context;
  };