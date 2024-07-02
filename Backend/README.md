# Pins-in-Sync Backend

This backend server integrates with Pinterest and Spotify APIs to match music to the vibe of a Pinterest feed.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Getting Started

To start the backend server, use the following command:

```bash
npm start
```

## Environment Variables

Make sure to set up your `.env` file with the following environment variables:

```plaintext
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
```

Replace `your_spotify_client_id` and `your_spotify_client_secret` with your actual Spotify application credentials.

This server interacts with the Pinterest API to fetch feed data and the Spotify API to fetch matching music tracks.