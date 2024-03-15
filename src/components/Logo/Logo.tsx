import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
    return (
        <div className="logo">
            <Link to={"/"}>
                <span className="logo-text">Movie App</span>
            </Link>
        </div>
    );
};

export default Logo;
