import React from 'react';
import HeaderForm from "../components/HeaderForm";

import AuctionArchiveItems from "../components/AuctionArchiveItems";

function AuctionsArchvePage() {
    return (
        <div style={{ background: "#D9D9D9", minHeight: "100vh" }}>
            <HeaderForm />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <AuctionArchiveItems/>
            </div>
        </div>
    );
}

export default AuctionsArchvePage;
