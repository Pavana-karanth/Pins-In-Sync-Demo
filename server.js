import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
const app = express();

const clientId = '02f93110c7ab44b68f4c12748965540a';
const clientSecret = '3850e1fa843f4b06a8364f7e4e25bd6c';

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

app.get('/token', async (req, res) => {
    try {
        const token = await getAccessToken();
        res.json({ accessToken: token });
    } catch (error) {
        console.error('Error fetching access token:', error.message);
        res.status(500).json({ error: 'Failed to fetch access token' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.static('public'));

app.get('/mockData.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'mockData.json'));
});
