import express from 'express';

const router = express.Router();

// auth:3000/login 
router.all('/*', async (req, res) => {
    // handle auth service
    const response = await fetch('auth/login');
    // validate
    const data = await response.json();
    res.json(data);
});

export default router;