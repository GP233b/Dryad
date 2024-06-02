import React, { useState } from 'react';
import PropTypes from 'prop-types';
import COLORS from "../styles/colors";

function NewPriceInput({ onSubmit }) {
    const [newPrice, setNewPrice] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;


        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setNewPrice(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (parseFloat(newPrice) >= 0.01) {
            onSubmit(newPrice);
            setNewPrice('');
        } else {
            alert('The price must be at least 0.01 PLN');
        }
    };

    const containerStyle = {
        padding: "20px",
        border: `1px solid ${COLORS.PRIMARY}`,
        borderRadius: "10px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        width: "80%",
        margin: "20px",
        backgroundColor: "white"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: `1px solid ${COLORS.SECONDARY}`,
        borderRadius: "5px"
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: COLORS.PRIMARY,
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter new price..."
                    value={newPrice}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
        </div>
    );
}

NewPriceInput.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default NewPriceInput;
