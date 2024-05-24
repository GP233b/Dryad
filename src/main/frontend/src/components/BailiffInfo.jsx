import React from 'react';
import PropTypes from 'prop-types';
import COLORS from "../styles/colors";

function BailiffInfo({ name, surname, phoneNumber, officeLocation }) {
    const containerStyle = {
        padding: "20px",
        border: `1px solid ${COLORS.PRIMARY}`,
        borderRadius: "10px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        width: "80%",
        margin: "20px",
        backgroundColor: "white"
    };

    const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        color: COLORS.PRIMARY,
        marginBottom: "20px"
    };

    const detailStyle = {
        fontSize: "16px",
        color: "#333",
        marginBottom: "10px"
    };

    return (
        <div style={containerStyle}>
            <div style={titleStyle}>Bailiff Information</div>
            <div style={detailStyle}>Name: {name}</div>
            <div style={detailStyle}>Surname: {surname}</div>
            <div style={detailStyle}>Phone Number: {phoneNumber}</div>
            <div style={detailStyle}>Office Location: {officeLocation}</div>
        </div>
    );
}

BailiffInfo.propTypes = {
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    officeLocation: PropTypes.string.isRequired
};

export default BailiffInfo;
