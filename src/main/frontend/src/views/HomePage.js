import React from 'react';
import HeaderForm from "../components/HeaderForm";
import AuctionSliderForm from '../components/AuctionSliderForm';

function HomePage() {
    return (
        <div style={{ background: "#D9D9D9", minHeight: "100vh" }}>
            <HeaderForm />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "1200px", padding: "0 20px" }}>
                    <AuctionSliderForm />
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    div > div {
                        padding: 0 10px;
                    }
                }
            `}</style>
        </div>
    );
}

export default HomePage;
