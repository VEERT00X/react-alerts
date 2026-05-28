import { useState, useEffect, createContext, type PropsWithChildren } from "react";
import { overlayStyle } from "../style";

export interface ConfirmContextType {
    showConfirm: (message: string, onConfirm: () => void, onCancel: () => void) => void;
}
const ConfirmContext = createContext<ConfirmContextType | null>(null);

interface ConfirmBoxProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
const ConfirmBox = ({ message, onConfirm, onCancel }: ConfirmBoxProps) => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onCancel !== null) {
                onCancel();
            }
        }
    }, [timeLeft, onCancel]);

    return (
        <div className="overlay-veert00x-react-alerts" style={overlayStyle}>
            <div className="confirm-box box-veert00x-react-alerts">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
                <p className="timer">Auto-cancel in {timeLeft} seconds</p>
            </div>
        </div>
    )
}

const ConfirmProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [confirm, setConfirm] = useState<ConfirmBoxProps | null>(null);

    const showConfirm = (message: string, onConfirm: () => void, onCancel: () => void) => {
        setConfirm({ message, onConfirm, onCancel });
    };

    return (
        <ConfirmContext.Provider value={{ showConfirm }}>
            {children}
            {confirm && <ConfirmBox message={confirm.message} onConfirm={() => { confirm.onConfirm(); setConfirm(null); }} onCancel={() => { confirm.onCancel(); setConfirm(null); }} />}
        </ConfirmContext.Provider>
    );
}

export { ConfirmProvider, ConfirmContext };