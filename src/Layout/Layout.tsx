import React, { ReactNode } from "react";
import Logo from "../components/Logo/Logo";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="main-container">
            <Logo />
            {children}
        </div>
    );
};

export default Layout;
