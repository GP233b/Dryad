import React from 'react';
import PropTypes from 'prop-types';
import COLORS from "../styles/colors";

function AuctionItem({
                         imageSrc,
                         title,
                         description,
                         date,
                         highestPrice,
                         księgaWieczysta,
                         cenaOszacowana,
                         geoportalNr
                     }) {
    const itemStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: `1px solid ${COLORS.PRIMARY}`,
        borderRadius: "10px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        width: "300px",
        margin: "20px"
    };

    const imageStyle = {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px 10px 0 0"
    };

    const titleStyle = {
        fontSize: "20px",
        fontWeight: "bold",
        color: COLORS.PRIMARY,
        margin: "10px 0"
    };

    const descriptionStyle = {
        fontSize: "16px",
        color: "#333",
        textAlign: "center",
        margin: "10px 0"
    };

    const dateStyle = {
        fontSize: "14px",
        color: "#555",
        margin: "10px 0"
    };

    const priceStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#e60000",
        margin: "10px 0"
    };

    const detailStyle = {
        fontSize: "14px",
        color: "#333",
        margin: "5px 0"
    };

    const priceDisplay = highestPrice != null ? `$${highestPrice}` : 'N/A';
    const estimatedPriceDisplay = cenaOszacowana != null ? `$${cenaOszacowana}` : 'N/A';

    return (
        <div style={itemStyle}>
            <img src={imageSrc} alt={title} style={imageStyle} />
            <div style={titleStyle}>{title}</div>
            <div style={descriptionStyle}>{description || 'No description available'}</div>
            <div style={dateStyle}>End Date: {date}</div>
            <div style={priceStyle}>Highest Bid: {priceDisplay}</div>
            <div style={detailStyle}>Nr księgi wieczystej: {księgaWieczysta || 'N/A'}</div>
            <div style={detailStyle}>Cena oszacowana: {estimatedPriceDisplay}</div>
            <div style={detailStyle}>Nr geoportalu: {geoportalNr || 'N/A'}</div>
        </div>
    );
}

AuctionItem.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    highestPrice: PropTypes.number,
    księgaWieczysta: PropTypes.string,
    cenaOszacowana: PropTypes.number,
    geoportalNr: PropTypes.string
};

export default AuctionItem;
