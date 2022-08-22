import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.all('/*', async (req, res) => {
    const url = `http://retrieval-service:8000${req.url}`;
    // forward request, aggregate data
    const response = await fetch(url, {
        method: req.method,
        headers: {
            access_token: req.headers.access_token as string // get the access token from middleware
        }
    });
    // return data
    const data = await response.json();
    res.json(data);
});

export default router;