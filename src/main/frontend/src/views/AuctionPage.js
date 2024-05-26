import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderForm from "../components/HeaderForm";
import AuctionItem from "../components/AuctionItem";
import BailiffInfo from "../components/BailiffInfo";
import NewPriceInput from "../components/NewPriceInput";
import axios from "axios";

function AuctionPage() {
    const { id: auctionId } = useParams();
    const [auctionData, setAuctionData] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userId = userResponse.data.id;

                const auctionResponse = await axios.get(`http://localhost:8080/auctions/${auctionId}`);
                setAuctionData(auctionResponse.data);
            } catch (error) {
                console.error('Error fetching auction data:', error);
            }
        };

        fetchAuctionData();
    }, [auctionId, token]);

    const handleNewPriceSubmit = async (newPrice) => {
        try {
            const userResponse = await axios.get('http://localhost:8080/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userId = userResponse.data.id;

            await axios.put(`http://localhost:8080/auctions/${auctionId}/updatePrice`, {
                newPrice: parseFloat(newPrice),
                userId: userId
            });

            const auctionResponse = await axios.get(`http://localhost:8080/auctions/${auctionId}`);
            setAuctionData(auctionResponse.data);
        } catch (error) {
            console.error('Error updating auction price:', error);
        }
    };

    const isAuctionActive = auctionData && new Date(auctionData.auction.endDate) > new Date();

    return (
        <div style={{ background: "#D9D9D9", minHeight: "100vh" }}>
            <HeaderForm />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", padding: "20px" }}>
                {auctionData && (
                    <>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                            <AuctionItem
                                images={auctionData.pictures.map(pic => process.env.PUBLIC_URL + pic.picture)}
                                description={auctionData.realEstate.description}
                                date={auctionData.auction.endDate}
                                highestPrice={auctionData.auction.winningPrice}
                                księgaWieczysta={auctionData.realEstate.landAndMortgageRegisterNumber}
                                cenaOszacowana={auctionData.realEstate.estimatedPrice}
                                geoportalNr={auctionData.realEstate.geoportalNumber}
                            />
                        </div>
                        <div style={{ flex: "1" }}>
                            <BailiffInfo
                                name={auctionData.bailiff.name}
                                surname={auctionData.bailiff.surname}
                                phoneNumber={auctionData.bailiff.phoneNumber}
                                officeLocation={auctionData.bailiff.officeLocation}
                            />
                            {isAuctionActive && token && <NewPriceInput onSubmit={handleNewPriceSubmit} />}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AuctionPage;
