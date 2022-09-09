import express from 'express';
import fetch from 'node-fetch';
import { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.all('/login/', async (req: Request, res: Response) => {
    console.log('request to login on gateway')
    // handle auth service
    const response = await fetch('http://auth-service:8001' + req.url);
    // validate
    if (response.ok) {
        res.redirect(response.url);
    } else {
        return res.redirect('http://quick-discover-ui:3000/');
    }
});

router.all('/login/callback', async (req: Request, res: Response) => {
    console.log('callback apigw req:', req);
    const response = await fetch('http://auth-service:8001' + req.url);
    return res.redirect(response.url);
});

router.all('/token', async (req: Request, res: Response) => {
    const response = await fetch('http://auth-service:8001/token/', {
        headers: {
            session_id: req.headers['session_id'] as string
        }
    });
    const data = await response.json();
    res.json(data);
});

export default router;