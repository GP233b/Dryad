import React, { useState, useEffect } from 'react';
import axios from 'axios';
import COLORS from "../styles/colors";
import { Link } from 'react-router-dom';

const ProfileForm = () => {
    const [user, setUser] = useState(null);
    const [wonAuctions, setWonAuctions] = useState([]);
    const [isHovered, setIsHovered] = useState(false); // Dodajemy stan isHovered

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
                fetchWonAuctions(response.data.id, token);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchWonAuctions = async (userId, token) => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}/won-auctions`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setWonAuctions(response.data);
            } catch (error) {
                console.error('Error fetching won auctions:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "#D9D9D9",
        borderRadius: "10px",
        padding: "20px",
        cursor: "pointer",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        textDecoration: "none",
        color: "inherit",
        transition: "background-color 0.3s"
    };

    const imageStyle = {
        width: "200px",
        height: "200px",
        borderRadius: "10px",
        marginRight: "20px"
    };

    const infoStyle = {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    };

    const highestPriceStyle = {
        color: "red",
        fontWeight: "bold"
    };

    const hoveredStyle = {
        background: "#f2f2f2"
    };

    return (
        <div style={{ width: "75%", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Twoje Wygrane Licytacje</h2>
            {wonAuctions.length === 0 ? (
                <div>No won auctions</div>
            ) : (
                wonAuctions.map(auction => (
                    <Link
                        key={auction.auction.id}
                        to={`/auction/${auction.auction.id}`}
                        style={{ ...containerStyle, ...(isHovered && hoveredStyle) }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img src={auction.pictures[0]?.picture} alt="Auction" style={imageStyle} />
                        <div style={infoStyle}>
                            <div style={{ color: "black" }}>End Date: {new Date(auction.auction.endDate).toLocaleDateString()}</div>
                            <div style={highestPriceStyle}>Highest Bid: {auction.auction.winningPrice} PLN</div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default ProfileForm;
