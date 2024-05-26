import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import HomePage from "./views/HomePage";
import SignUpPage from "./views/SignUpPage";
import ProfilePage from "./views/ProfilePage";
import AuctionPage from "./views/AuctionPage";
import AuctionsPage from "./views/AuctionsPage";
import AuctionArchiveItems from "./components/AuctionArchiveItems";
import AuctionsArchvePage from "./views/AuctionsArchvePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/SignUp" element={<SignUpPage/>} />
                <Route path="/Profile" element={<ProfilePage/>} />
                <Route path="/Auction/:id" element={<AuctionPage/>} />
                <Route path="/Auctions" element={<AuctionsPage/>} />
                <Route path="/archive" element={<AuctionsArchvePage/>} />
            </Routes>
        </Router>
    );
}

export default App;
