import React, { createContext, useState, ReactNode } from "react";
import { Class } from "../utils/classUtils";

interface ActiveClassContextProps {
    activeClass: Class | null;
    setActiveClass: React.Dispatch<React.SetStateAction<Class | null>>;
}

const ActiveClassContext = createContext<ActiveClassContextProps | undefined>(undefined);

export const ActiveClassProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ activeClass, setActiveClass ] = useState<Class | null>(null);

    return (
        <ActiveClassContext.Provider value={{ activeClass, setActiveClass }}>
            {children}
        </ActiveClassContext.Provider>
    );
};


export default ActiveClassContext;