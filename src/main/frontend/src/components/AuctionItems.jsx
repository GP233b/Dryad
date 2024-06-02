import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Home = () => {
    const [auctions, setAuctions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [auctionsPerPage] = useState(3); // Zmiana na 3 licytacje na stronie
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auctions');
                console.log('Auctions fetched:', response.data); // Debug log
                setAuctions(response.data);
            } catch (error) {
                console.error('Error fetching auctions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, []);

    const filteredAuctions = auctions.filter(auction => new Date(auction.auction.endDate) > new Date());

    const indexOfLastAuction = currentPage * auctionsPerPage;
    const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
    const currentAuctions = filteredAuctions.slice(indexOfFirstAuction, indexOfLastAuction);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ width: "75%", margin: "0 auto" }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {currentAuctions.map((auction) => (
                        <AuctionItem
                            key={auction.auction.id}
                            image={auction.pictures[0]?.picture}
                            endDate={auction.auction.endDate}
                            highestPrice={auction.auction.winningPrice}
                            auctionId={auction.auction.id}
                            auctionName={auction.auction.name}
                        />
                    ))}
                    <Pagination
                        auctionsPerPage={auctionsPerPage}
                        totalAuctions={filteredAuctions.length}
                        paginate={paginate}
                    />
                </>
            )}
        </div>
    );
}

const AuctionItem = ({ image, endDate, highestPrice, auctionId,auctionName }) => {
    const [isHovered, setIsHovered] = useState(false);

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: isHovered ? "#f2f2f2" : "#D9D9D9",
        transition: "background-color 0.3s",
        borderRadius: "10px",
        padding: "20px",
        cursor: "pointer",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        textDecoration: "none",
        color: "inherit"
    };

    const imageStyle = {
        width: "200px",
        height: "200px",
        borderRadius: "10px",
        marginRight: "20px"
    };

    const infoStyle = {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    };

    const highestPriceStyle = {
        color: "red",
        fontWeight: "bold"
    };

    return (
        <Link to={`/auction/${auctionId}`} style={containerStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
            <img src={image} alt="Auction" style={imageStyle} />
            <div style={infoStyle}>
                <div style={{ color: "black", fontSize: "larger", fontWeight: "bold" }}>{auctionName}</div>
                <div style={{ color: "black" }}>End Date: {new Date(endDate).toLocaleDateString()}</div>
                <div style={highestPriceStyle}>Highest Bid: {highestPrice} PLN</div>
            </div>
        </Link>
    );
}

const Pagination = ({ auctionsPerPage, totalAuctions, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAuctions / auctionsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
                {pageNumbers.map(number => (
                    <li key={number} style={{ margin: '0 5px' }}>
                        <button onClick={() => paginate(number)} style={{ cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f2f2f2' }}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Home;
