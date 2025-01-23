import React, { createContext, useState, ReactNode } from "react";
import { Class } from "../utils/classUtils";

interface ActiveClassContextProps {
    activeClass: Class | null;
    setActiveClass: React.Dispatch<React.SetStateAction<Class | null>>;
}

const ActiveClassContext = createContext<ActiveClassContextProps | undefined>(undefined);

interface ActiveClassProviderProps {
    children: ReactNode;
    defaultActiveClass?: Class | null;
}

export const ActiveClassProvider: React.FC<ActiveClassProviderProps> = ({ children, defaultActiveClass = null }) => {
    const [ activeClass, setActiveClass ] = useState<Class | null>(defaultActiveClass);

    return (
        <ActiveClassContext.Provider value={{ activeClass, setActiveClass }}>
            {children}
        </ActiveClassContext.Provider>
    );
};


export default ActiveClassContext;