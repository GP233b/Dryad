import React, { useState } from 'react';
import PropTypes from 'prop-types';
import COLORS from "../styles/colors";

function AuctionItem({
                         images,
                         title,
                         description,
                         date,
                         highestPrice,
                         księgaWieczysta,
                         cenaOszacowana,
                         geoportalNr
                     }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: "20px",
        border: `1px solid ${COLORS.PRIMARY}`,
        borderRadius: "10px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        width: "80%",
        margin: "20px auto",
        backgroundColor: "white"
    };

    const imageContainerStyle = {
        position: "relative",
        width: "40%",
        marginRight: "20px"
    };

    const imageStyle = {
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "10px"
    };

    const arrowStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 1
    };

    const leftArrowStyle = {
        ...arrowStyle,
        left: "10px"
    };

    const rightArrowStyle = {
        ...arrowStyle,
        right: "10px"
    };

    const detailsContainerStyle = {
        width: "60%"
    };

    const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        color: COLORS.PRIMARY,
        marginBottom: "20px"
    };

    const descriptionStyle = {
        fontSize: "16px",
        color: "#333",
        marginBottom: "20px"
    };

    const detailStyle = {
        fontSize: "14px",
        color: "#555",
        marginBottom: "10px"
    };

    const highestPriceStyle = {
        ...detailStyle,
        color: "red",
        fontWeight: "bold"
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                <button style={leftArrowStyle} onClick={handlePrevImage}>&lt;</button>
                <img src={images[currentImageIndex]} alt={title} style={imageStyle} />
                <button style={rightArrowStyle} onClick={handleNextImage}>&gt;</button>
            </div>
            <div style={detailsContainerStyle}>
                <div style={titleStyle}>{title}</div>
                <div style={descriptionStyle}>{description}</div>
                <div style={detailStyle}>End Date: {date}</div>
                <div style={highestPriceStyle}>Highest Bid: {formatPrice(highestPrice)}</div>
                <div style={detailStyle}>Nr księgi wieczystej: {księgaWieczysta}</div>
                <div style={detailStyle}>Cena oszacowana: {formatPrice(cenaOszacowana)}</div>
                <div style={detailStyle}>Nr geoportalu: <a href={geoportalNr} target="_blank" rel="noopener noreferrer">{geoportalNr}</a></div>
            </div>
        </div>
    );
}

AuctionItem.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    highestPrice: PropTypes.number.isRequired,
    księgaWieczysta: PropTypes.string.isRequired,
    cenaOszacowana: PropTypes.number.isRequired,
    geoportalNr: PropTypes.string.isRequired
};

export default AuctionItem;
