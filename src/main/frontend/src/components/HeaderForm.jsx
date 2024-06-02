import React, { useState, useEffect } from 'react';
import COLORS from "../styles/colors";
import Logo from "../logo.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }

                const response = await axios.get("http://localhost:8080/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
        // Check if the role is admin
        const role = localStorage.getItem('role');
        if (role === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    const handleNavigation = (path) => {
        console.log("Przekierowanie na:", path);
        window.location.href = path;
    };

    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem('token');
        window.location.href = "/login";
    };

    const handleProfileClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
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
        width: "400px",
    };

    const headerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        position: "relative" // To position the logout button absolutely within the header
    };

    const logoutButtonStyle = {
        position: "absolute",
        top: "10px",
        left: "10px",
        ...buttonStyle
    };

    const welcomeStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        textAlign: "right",
        color: COLORS.PRIMARY
    };

    return (
        <header style={headerStyle}>
            <button
                onClick={handleLogout}
                style={{ ...logoutButtonStyle, ...(hoveredButton === "LOGOUT" && buttonHoverStyle) }}
                onMouseEnter={() => handleMouseEnter("LOGOUT")}
                onMouseLeave={handleMouseLeave}
            >
                LOGOUT
            </button>
            <div style={welcomeStyle}>
                {user && `WITAJ ${user.urdName} ${user.urdSurname}`}
                {isAdmin && (
                    <button
                        onClick={() => handleNavigation("/add-auction")}
                        style={{ ...buttonStyle, marginLeft: "20px" }}
                    >
                        DODAJ AUKCJE
                    </button>
                )}
            </div>
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
                            onClick={handleProfileClick}
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
