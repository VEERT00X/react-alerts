import { useState, useEffect, createContext, type PropsWithChildren } from "react";
import { overlayStyle } from "../style";

export interface AlertContextType {
    showAlert: (message: string, type: "success" | "error" | "warning" | "info", duration: number) => void;
    hideAlert: () => void;
}
const AlertContext = createContext<AlertContextType | null>(null);

interface AlertBoxProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration: number;
    onTimeout: () => void;
}
const AlertBox = ({ message, type, duration, onTimeout }: AlertBoxProps) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, duration > 10 ? 1000 : duration * 100);
        return () => clearInterval(timer);
    }, [duration]);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onTimeout !== null) {
                onTimeout();
            }
        }
    }, [timeLeft, onTimeout]);

    return (
        <div className="overlay-veert00x-react-alerts" style={overlayStyle}>
            <div className={`alert-box ${type} box-veert00x-react-alerts`}>
                {message}
                <p className="timer">Auto-dismiss in {timeLeft} seconds</p>
            </div>
        </div>
    );
};

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "warning" | "info"; duration: number } | null>(null);

    const showAlert = (message: string, type: "success" | "error" | "warning" | "info", duration: number) => {
        setAlert({ message, type, duration });
    };

    const hideAlert = () => {
        setAlert(null);
    }

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert && <AlertBox message={alert.message} type={alert.type} duration={alert.duration} onTimeout={hideAlert} />}
        </AlertContext.Provider>
    );
}


export { AlertContext };