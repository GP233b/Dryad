import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderForm from "../components/HeaderForm";
import AuctionItem from "../components/AuctionItem";
import BailiffInfo from "../components/BailiffInfo";
import NewPriceInput from "../components/NewPriceInput"; // Import nowego komponentu
import axios from "axios";

function AuctionPage() {
    const { id: auctionId } = useParams();
    const [auctionData, setAuctionData] = useState(null);
    const token = localStorage.getItem('token'); // Sprawdzanie istnienia tokenu

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auctions/${auctionId}`);
                setAuctionData(response.data);
            } catch (error) {
                console.error('Error fetching auction data:', error);
            }
        };

        fetchAuctionData();
    }, [auctionId]);

    const auctionInfoContainerStyle = {
        flex: "1", // Rozciągnięcie kontenera na całą dostępną przestrzeń
        marginRight: "20px" // Margines odstępu między kontenerami
    };

    const bailiffInfoContainerStyle = {
        flex: "1" // Rozciągnięcie kontenera na całą dostępną przestrzeń
    };

    const handleNewPriceSubmit = (newPrice) => {
        // Logika obsługi nowej ceny
        console.log("Submitted new price:", newPrice);
    };

    const isAuctionActive = auctionData && new Date(auctionData.auction.endDate) > new Date();

    return (
        <div style={{ background: "#D9D9D9", minHeight: "100vh" }}>
            <HeaderForm />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", padding: "20px" }}>
                {auctionData && (
                    <>
                        <div style={auctionInfoContainerStyle}>
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
                        <div style={bailiffInfoContainerStyle}>
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
