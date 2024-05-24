import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderForm from "../components/HeaderForm";
import AuctionItem from "../components/AuctionItem";
import BailiffInfo from "../components/BailiffInfo";
import axios from "axios";

function AuctionPage() {
    const { id: auctionId } = useParams();
    const [auctionData, setAuctionData] = useState(null);

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

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
        padding: "20px"
    };

    return (
        <div style={{background: "#D9D9D9", minHeight:"100vh"}}>
            <HeaderForm />
            <div style={containerStyle}>
                {auctionData && (
                    <>
                        <AuctionItem
                            images={auctionData.pictures.map(pic => process.env.PUBLIC_URL + pic.picture)}

                            description={auctionData.realEstate.description}
                            date={auctionData.auction.endDate}
                            highestPrice={auctionData.auction.winningPrice}
                            księgaWieczysta={auctionData.realEstate.landAndMortgageRegisterNumber}
                            cenaOszacowana={auctionData.realEstate.estimatedPrice}
                            geoportalNr={auctionData.realEstate.geoportalNumber}
                        />
                        <BailiffInfo
                            name={auctionData.bailiff.name}
                            surname={auctionData.bailiff.surname}
                            phoneNumber={auctionData.bailiff.phoneNumber}
                            officeLocation={auctionData.bailiff.officeLocation}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default AuctionPage;
