import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from 'react-router-dom';

const Home = () => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auctions');
                console.log('Auctions fetched:', response.data); // Debug log

                // Filtrujemy aukcje, aby wyświetlać tylko te, które się jeszcze nie zakończyły
                const activeAuctions = response.data.filter(auction => new Date(auction.auction.endDate) > new Date());

                // Przycinamy tablicę do 4 aukcji
                const limitedAuctions = activeAuctions.slice(0, 4);

                setAuctions(limitedAuctions);
            } catch (error) {
                console.error('Error fetching auctions:', error);
            } finally {
                setLoading(false); // Mark loading as false after data is fetched
            }
        };

        fetchAuctions();
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div style={{ width: "75%", margin: "0 auto" }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Slider {...settings} style={{ margin: "20px auto" }}>
                    {auctions.map((auction) => (
                        <Slide
                            key={auction.auction.id}
                            image={auction.pictures[0]?.picture}
                            endDate={auction.auction.endDate}
                            highestPrice={auction.auction.winningPrice}
                            auctionId={auction.auction.id}
                            auctionName={auction.auction.name} // Dodane pole z nazwą aukcji
                        />
                    ))}
                </Slider>
            )}
        </div>
    );
}

const Slide = ({ image, endDate, highestPrice, auctionId, auctionName }) => {
    const [isHovered, setIsHovered] = useState(false);

    const containerStyle = {
        width: 250,
        height: 250,
        background: isHovered ? "#f2f2f2" : "#D9D9D9",
        transition: "background-color 0.3s",
        borderRadius: "10px",
        padding: "20px",
        cursor: "pointer",
        textAlign: "center",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)"
    };

    const imageStyle = {
        width: "100%",
        borderRadius: "10px",
        marginBottom: "10px"
    };

    const highestPriceStyle = {
        color: "red",
        fontWeight: "bold"
    };

    return (
        <Link to={`/auction/${auctionId}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div
                style={containerStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={image} alt="Auction" style={{ ...imageStyle }} />
                <div style={{ color: "black", fontWeight: "bold" }}>{auctionName}</div> {/* Wyświetlenie nazwy aukcji */}
                <div style={{ color: "black" }}>End Date: {new Date(endDate).toLocaleDateString()}</div>
                <div style={highestPriceStyle}>Highest Bid: {highestPrice} PLN</div>
            </div>
        </Link>
    );
}

export default Home;
