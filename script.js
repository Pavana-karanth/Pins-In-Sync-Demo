const mockDataUrl = '/mockData.json';

const moodPlaylists = {
    "travel": "37i9dQZF1EQp62d3Dl7ECY",
    "cottagecore": "5RuLAJaYDz690KrqXHeh5y",
    "grunge": "37i9dQZF1EIcpZCXN80nLP",
    "darkacademia": "3S6qCdUwfXJUTJotzWdyu6",
    "fantasy": "6yIfxGFCjeoQ73u7Y4xAYX",
    "softacademia": "64Wlj2CKT51iVk5vWbJ5Eq"
};

async function fetchMockData() {
    const response = await fetch(mockDataUrl);
    return response.json();
}

async function getRecommendations() {
    const username = document.getElementById('pinterestUsername').value.trim().toLowerCase();
    const mockData = await fetchMockData();
    const interests = mockData[username];

    if (interests) {
        document.getElementById('spotifyPlaylists').innerHTML = '';
        interests.forEach(interest => {
            if (moodPlaylists[interest]) {
                embedSpotifyPlaylist(moodPlaylists[interest]);
            } else {
                console.warn(`No playlist found for interest: ${interest}`);
            }
        });
    } else {
        alert('No data found for this username!');
    }
}

function embedSpotifyPlaylist(playlistId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
    iframe.width = '70%';
    iframe.height = '352';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    document.getElementById('spotifyPlaylists').appendChild(iframe);
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        await fetchMockData(); // Preload mock data
    } catch (error) {
        console.error('Initialization error:', error.message);
    }
});
