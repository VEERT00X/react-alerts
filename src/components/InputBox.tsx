import { useState, createContext, type PropsWithChildren } from "react";
import { overlayStyle } from "../style";

interface inputBoxProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export interface InputBoxContextType {
    showInputBox: (label: string, value: string, onChange: (value: string) => void) => void;
}
const InputBoxContext = createContext<InputBoxContextType | null>(null);

export const InputBox = ({ label, value, onChange }: inputBoxProps) => {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    }

    return (
        <div className="overlay-veert00x-react-alerts" style={overlayStyle}>
            <div className="input-box box-veert00x-react-alerts">
                <label>{label}</label>
                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => handleChange(e)}
                />
                <button onClick={() => {
                    onChange(localValue);
                    setLocalValue("");
                }}>OK</button>
            </div>
        </div>
    );
}

const InputBoxProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [inputBox, setInputBox] = useState<inputBoxProps | null>(null);

    const showInputBox = (label: string, value: string, onChange: (value: string) => void) => {
        setInputBox({ label, value, onChange });
    };

    const hideInputBox = () => {
        setInputBox(null);
    }

    const handleChange = (value: string) => {
        if (inputBox) {
            inputBox.onChange(value);
            hideInputBox();
        }
    }

    return (
        <InputBoxContext.Provider value={{ showInputBox }}>
            {children}
            {inputBox && <InputBox label={inputBox.label} value={inputBox.value} onChange={handleChange} />}
        </InputBoxContext.Provider>
    );
}


export { InputBoxProvider, InputBoxContext };