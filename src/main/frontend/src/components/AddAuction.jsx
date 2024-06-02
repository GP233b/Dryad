import React, { useState, useEffect } from 'react';
import axios from 'axios';
import COLORS from '../styles/colors';

const AddAuction = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [propertyRegistryNumber, setPropertyRegistryNumber] = useState('');
    const [photos, setPhotos] = useState([]);
    const [geoportalLink, setGeoportalLink] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bailiffs, setBailiffs] = useState([]);
    const [selectedBailiff, setSelectedBailiff] = useState('');

    useEffect(() => {
        const fetchBailiffs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bailiffs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBailiffs(response.data);
            } catch (error) {
                console.error('Error fetching bailiffs:', error);
            }
        };

        fetchBailiffs();
    }, []);

    const [photoNames, setPhotoNames] = useState([]);

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        const names = files.map(file => file.name);
        setPhotoNames(names);
    };

    const handlePriceChange = (setter) => (event) => {
        const value = event.target.value;
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(value) || value === '') {
            setter(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('propertyRegistryNumber', propertyRegistryNumber);
        photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });
        formData.append('geoportalLink', geoportalLink);
        formData.append('estimatedPrice', estimatedPrice);
        formData.append('startingPrice', startingPrice);
        formData.append('endDate', endDate);
        formData.append('bailiffId', selectedBailiff);

        try {
            // Add Real Estate
            const realEstateResponse = await axios.post(
                'http://localhost:8080/realestates/add',
                {
                    startingPrice,
                    estimatedPrice,
                    landAndMortgageRegisterNumber: propertyRegistryNumber,
                    geoportalNumber: geoportalLink,
                    description,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            const realEstateId = realEstateResponse.data.id;
            console.log(realEstateId)

            // Add Auction
            const auctionResponse = await axios.post(
                'http://localhost:8080/auctions/add',
                {
                    name: title,
                    startingPrice,
                    endDate,
                    bailiffId: selectedBailiff,
                    realEstateId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );



            const auctionId = auctionResponse.data.id;
            console.log(auctionId)

            for (const photoName of photoNames) {
                try {
                    await axios.post(
                        'http://localhost:8080/realEstatePictures/add',
                        {
                            auctionId,
                            picture: photoName,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                } catch (error) {
                    console.error('Error adding real estate picture:', error);
                }
            }



            console.log('Auction added successfully:', auctionResponse.data);
            // Reset form fields
            setTitle('');
            setDescription('');
            setPropertyRegistryNumber('');
            setPhotos([]);
            setGeoportalLink('');
            setEstimatedPrice('');
            setStartingPrice('');
            setEndDate('');
            setSelectedBailiff('');
        } catch (error) {
            console.error('Error adding auction:', error);
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const labelStyle = {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
        color: COLORS.PRIMARY,
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginTop: '5px',
    };

    const buttonStyle = {
        padding: '15px 25px',
        fontSize: '16px',
        backgroundColor: COLORS.PRIMARY,
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#D9D9D9', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', color: COLORS.PRIMARY }}>Add New Auction</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={labelStyle}>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={labelStyle}>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ ...inputStyle, height: '100px' }}
                    />
                </div>
                <div style={labelStyle}>
                    Property Registry Number:
                    <input
                        type="text"
                        value={propertyRegistryNumber}
                        onChange={(e) => setPropertyRegistryNumber(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={labelStyle}>
                    Photos:
                    <input
                        type="file"
                        multiple
                        onChange={handlePhotoUpload}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={labelStyle}>
                    Geoportal Link:
                    <input
                        type="url"
                        value={geoportalLink}
                        onChange={(e) => setGeoportalLink(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={labelStyle}>
                    Estimated Price:
                    <input
                        type="number"
                        value={estimatedPrice}
                        onChange={handlePriceChange(setEstimatedPrice)}
                        required
                        style={inputStyle}
                        step="0.01"
                        min="0"
                    />
                </div>
                <div style={labelStyle}>
                    Starting Price:
                    <input
                        type="number"
                        value={startingPrice}
                        onChange={handlePriceChange(setStartingPrice)}
                        required
                        style={inputStyle}
                        step="0.01"
                        min="0"
                    />
                </div>
                <div style={labelStyle}>
                    Auction End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={labelStyle}>
                    Bailiff:
                    <select
                        value={selectedBailiff}
                        onChange={(e) => setSelectedBailiff(e.target.value)}
                        required
                        style={inputStyle}
                    >
                        <option value="" disabled>Select Bailiff</option>
                        {bailiffs.map((bailiff) => (
                            <option key={bailiff.id} value={bailiff.id}>
                                {bailiff.baiName} {bailiff.baiSurname}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={buttonStyle}>Add Auction</button>
            </form>
        </div>
    );
};

export default AddAuction;

