import React from 'react';
import HeaderForm from "../components/HeaderForm";
import AuctionSliderForm from '../components/AuctionSliderForm';
import AuctionItems from "../components/AuctionItems";

function AuctionsPage() {
    return (
        <div style={{ background: "#D9D9D9", minHeight: "100vh" }}>
            <HeaderForm />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <AuctionItems />
            </div>
        </div>
    );
}

export default AuctionsPage;
