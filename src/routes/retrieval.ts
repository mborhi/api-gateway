import express from 'express';

const router = express.Router();

router.all('/*', async (req, res) => {
    // forward request, aggregate data
    const response = await fetch('retrieve');
    // validate
    const data = await response.json();
    res.json(data);
});

export default router;