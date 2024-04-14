import React from 'react';
import AuctionSliderForm from '../components/AuctionSliderForm';
import HeaderForm from "../components/HeaderForm";

function HomePage() {
    return (
        <div style={{background: "#D9D9D9",minHeight:"100vh"}}>
            <HeaderForm/>
            <div style={{display:"flex",justifyContent:"center"}}>
                <AuctionSliderForm/>

            </div>
        </div>
    );
}

export default HomePage;
