import React from "react";
import { ConfirmContext } from "../components/ConfirmBox";

export const useConfirmBox = () => {
    const context = React.useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirmBox must be used within a ConfirmProvider");
    }
    return context;
}