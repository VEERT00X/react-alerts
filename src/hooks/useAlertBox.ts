import React from "react";
import { AlertContext } from "../components/AlertBox";

export const useAlertBox = () => {
    const context = React.useContext(AlertContext);
    if (!context) {
        throw new Error("useAlertBox must be used within an AlertBoxProvider");
    }
    return context;
}