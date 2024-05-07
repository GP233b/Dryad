import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Logo from "../logo.png";

const Home = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings} style={{ width: "75%", display: "flex", alignItems: "center",justifyContent: "center", gap: 20 }}>
            <Slide />
            <Slide />
            <Slide />
            <Slide />
            <Slide />
        </Slider>
    );
}

const Slide = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const containerStyle = {
        width: 250,
        height: 250,
        background: isHovered ? "#f2f2f2" : "#D9D9D9",
        transition: "background-color 0.3s",
        borderRadius: "10px",
        padding: "20px",
        cursor: "pointer",
        textAlign: "center",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)"
    };

    const imageStyle = {
        width: "100%",
        borderRadius: "10px",
        marginBottom: "10px"
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            style={{ ...containerStyle }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={Logo} alt="Auction" style={{ ...imageStyle }} />
            <div>AUKCJA NAZWA</div>
            <div>31.12.2025</div>
        </div>
    );
}

export default Home;
