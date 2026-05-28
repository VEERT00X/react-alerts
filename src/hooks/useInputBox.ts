import React from "react";
import { InputBoxContext } from "../components/InputBox";

export const useInputBox = () => {
    const context = React.useContext(InputBoxContext);
    if (!context) {
        throw new Error("useInputBox must be used within an InputBoxProvider");
    }
    return context;
}