import React from 'react';

import HeaderForm from "../components/HeaderForm";
import AuctionSliderForm from "../components/AuctionSliderForm";
import ProfileForm from "../components/ProfileForm";

function ProfilePage() {
    return (
        <div style={{background: "#D9D9D9",minHeight:"100vh"}}>
            <HeaderForm/>
            <div style={{display:"flex",justifyContent:"center"}}>
                <ProfileForm/>
            </div>
        </div>
    );
}

export default ProfilePage;
