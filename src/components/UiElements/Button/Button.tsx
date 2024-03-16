import React from "react";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, buttonText }) => {
    return (
        <button className={`bttn ${className}`} onClick={onClick}>
            {buttonText}
        </button>
    );
};

export default Button;
