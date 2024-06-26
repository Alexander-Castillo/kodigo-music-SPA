// src/components/Layout.jsx

import { useState } from "react";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import '../Layout/Navbar/assets/css/Navbar.css'

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
    

    //MANEJO DE USO DE ESTADO PARA EXPANDIR EL SIDEBAR CUANDO SE DA CLICK EN EL ICONO DE KODIGO
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    
    return (
        <div className="wrapper">
            <Navbar isExpanded={isExpanded} toggleSidebar={toggleSidebar}/>
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    )
}