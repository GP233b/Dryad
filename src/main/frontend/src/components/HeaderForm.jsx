import React, { useState } from 'react';
import COLORS from "../styles/colors";
import Logo from "../logo.png";

const Header = ({ title }) => {
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleNavigation = (path) => {
        console.log("Przekierowanie na:", path);
        window.location.href = path;
    };

    const buttonStyle = {
        padding: "15px 25px",
        fontSize: "16px",
        backgroundColor: COLORS.PRIMARY,
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s"
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3"
    };

    const handleMouseEnter = (button) => {
        setHoveredButton(button);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const logoStyle = {
        width: "400px", // Dostosuj szerokość logo według potrzeb
    };

    return (
        <header style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <div style={logoStyle}>
                <img src={Logo} alt="Logo" style={{ width: "100%" }} />
            </div>
            <nav>
                <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
                    <li>
                        <button
                            onClick={() => handleNavigation("/")}
                            style={{ ...buttonStyle, ...(hoveredButton === "HOME" && buttonHoverStyle) }}
                            onMouseEnter={() => handleMouseEnter("HOME")}
                            onMouseLeave={handleMouseLeave}
                        >
                            HOME
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/auctions")}
                            style={{ ...buttonStyle, ...(hoveredButton === "AUCTIONS" && buttonHoverStyle) }}
                            onMouseEnter={() => handleMouseEnter("AUCTIONS")}
                            onMouseLeave={handleMouseLeave}
                        >
                            AUCTIONS
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/archive")}
                            style={{ ...buttonStyle, ...(hoveredButton === "ARCHIVE" && buttonHoverStyle) }}
                            onMouseEnter={() => handleMouseEnter("ARCHIVE")}
                            onMouseLeave={handleMouseLeave}
                        >
                            ARCHIVE AUCTIONS
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/login")}
                            style={{ ...buttonStyle, ...(hoveredButton === "PROFILE" && buttonHoverStyle) }}
                            onMouseEnter={() => handleMouseEnter("PROFILE")}
                            onMouseLeave={handleMouseLeave}
                        >
                            PROFILE
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
