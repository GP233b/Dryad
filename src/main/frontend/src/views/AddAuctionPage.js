import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderForm from "../components/HeaderForm";
import AddAuction from "../components/AddAuction";

function AddAuctionsPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            navigate('/not-authorized'); // przekierowanie na inną stronę np. 'not-authorized'
        }
    }, [navigate]);

    return (
        <div style={{ background: "#D9D9D9", minHeight: "100vh" }}>
            <HeaderForm />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <AddAuction />
            </div>
        </div>
    );
}

export default AddAuctionsPage;
