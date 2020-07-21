import React from "react";
import Logo from "../assets/Logo.png";


export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} className="logo-icon"/>
            </div>
            <div className="first-symbol">В</div>
            <div className="logo-label">сети</div>
        </header>
    );
}