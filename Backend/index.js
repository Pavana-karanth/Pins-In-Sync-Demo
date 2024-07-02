import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

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

// Express middleware setup
app.use(cors()); // Use cors middleware
app.use(express.static('public')); // Serve static files from 'public' folder

// Routes
app.get('/token', async (req, res) => {
    try {
        const token = await getAccessToken();
        res.json({ accessToken: token });
    } catch (error) {
        console.error('Error fetching access token:', error.message);
        res.status(500).json({ error: 'Failed to fetch access token' });
    }
});

app.get('/mockData', (req, res) => {
    res.sendFile(path.join(__dirname, 'mockData.json'));
});

// Swagger UI setup
import swaggerDocument from './swagger-output.json';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
