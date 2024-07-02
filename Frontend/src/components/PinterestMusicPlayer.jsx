import React, { useState, useEffect } from 'react';
import './styles.css';

const moodPlaylists = {
    "travel": "37i9dQZF1EQp62d3Dl7ECY",
    "cottagecore": "5RuLAJaYDz690KrqXHeh5y",
    "grunge": "37i9dQZF1EIcpZCXN80nLP",
    "darkacademia": "3S6qCdUwfXJUTJotzWdyu6",
    "fantasy": "6yIfxGFCjeoQ73u7Y4xAYX",
    "softacademia": "64Wlj2CKT51iVk5vWbJ5Eq"
};

const fetchMockData = async () => {
    const response = await fetch('http://localhost:8000/mockData');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const PinterestMusicPlayer = () => {
    const [mockData, setMockData] = useState({});
    const [username, setUsername] = useState('');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const initializeData = async () => {
            try {
                const data = await fetchMockData();
                setMockData(data);
            } catch (error) {
                console.error('Initialization error:', error.message);
            }
        };

        initializeData();
    }, []);

    const getRecommendations = () => {
        const interests = mockData[username.trim().toLowerCase()];

        if (interests) {
            const newPlaylists = interests.map(interest => moodPlaylists[interest]).filter(Boolean);
            setPlaylists(newPlaylists);
        } else {
            alert('No data found for this username!');
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Pins In Sync</h1>
                <p>Enter your Pinterest username to get playlists based on your saved pins</p>
                <div className="buttons">
                    <input 
                        type="text" 
                        id="pinterestUsername" 
                        placeholder="Pinterest Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <button onClick={getRecommendations}>Get Songs</button>  
                </div>
            </div>
            
            <div id="spotifyPlaylists">
                {playlists.map(playlistId => (
                    <iframe 
                        key={playlistId}
                        src={`https://open.spotify.com/embed/playlist/${playlistId}`}
                        width="70%"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        style={{ borderRadius: '12px', marginTop: '20px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PinterestMusicPlayer;
