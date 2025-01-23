import { useContext } from "react";
import ActiveClassContext from "./ActiveClassContext";

export const useActiveClass = () => {
    const context = useContext(ActiveClassContext);
    if (!context) {
      throw new Error("useActiveClass must be used within an ActiveClassProvider");
    }
    return context;
};