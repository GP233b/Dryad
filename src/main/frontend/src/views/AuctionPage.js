import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderForm from "../components/HeaderForm";
import AuctionItem from "../components/AuctionItem";
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

    if (!auctionData) {
        return <div>Loading...</div>;
    }

    const { auction, bailiff, pictures, realEstate } = auctionData;

    return (
        <div style={{ background: "#D9D9D9", minHeight: "100vh" }}>
            <HeaderForm />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <AuctionItem
                    imageSrc={pictures.length > 0 ? pictures[0].picture : ''}
                    title={`Auction ${auction.id}`}
                    description={realEstate.description}
                    date={auction.endDate}
                    highestPrice={auction.winningPrice}
                    księgaWieczysta={realEstate.landAndMortgageRegisterNumber}
                    cenaOszacowana={realEstate.estimatedPrice}
                    geoportalNr={realEstate.geoportalNumber}
                />
            </div>
        </div>
    );
}

export default AuctionPage;
