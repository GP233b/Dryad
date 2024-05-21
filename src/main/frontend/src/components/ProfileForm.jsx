import React, { useState, useEffect } from 'react';
import axios from 'axios';
import COLORS from "../styles/colors";

const ProfileForm = () => {
    const [user, setUser] = useState(null);

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
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const profileContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: COLORS.BACKGROUND,
        color: COLORS.TEXT,
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "50px auto"
    };

    const profileItemStyle = {
        marginBottom: "15px",
        fontSize: "18px"
    };

    const labelStyle = {
        fontWeight: "bold"
    };

    return (
        <div style={profileContainerStyle}>
            <div style={profileItemStyle}>
                <span style={labelStyle}>Imię:</span> {user.urdName}
            </div>
            <div style={profileItemStyle}>
                <span style={labelStyle}>Nazwisko:</span> {user.urdSurname}
            </div>
            <div style={profileItemStyle}>
                <span style={labelStyle}>PESEL:</span> {user.urdPesel}
            </div>
        </div>
    );
};

export default ProfileForm;
