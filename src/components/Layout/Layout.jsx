// src/components/Layout.jsx

import { useState } from "react";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import '../Layout/Navbar/assets/css/Navbar.css'

const Layout = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="wrapper">
            <Navbar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
