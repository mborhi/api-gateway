import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.all('/*', async (req, res) => {
    // forward request, aggregate data
    const url = 'http://playback-service:8002/playback' + req.url;
    console.log('apigw url:', url);
    const response = await fetch(url, {
        method: req.method,
        headers: {
            access_token: req.headers.access_token as string
        }
    });
    const data = await response.json();
    // return data
    res.json(data);
});

export default router;