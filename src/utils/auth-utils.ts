import fetch from 'node-fetch';
import { NextFunction, Request, Response } from 'express';
import { dataIsError } from './fetch-utils';

export const requireLogin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers || !req.headers['session_id']) {
        return res.json({
            "error": {
                "status": 400,
                "message": "Missing session id from headers"
            }
        });
    }
    const response = await fetch('http://auth-service:8001/token', {
        method: "GET",
        headers: {
            session_id: req.headers["session_id"] as string
        }
    });
    try {
        const data = await response.json();
        if (dataIsError(data)) return res.json(data);
        // attach retrieved access token to header 
        req.headers.access_token = data.access_token;
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            "error": {
                "status": 500,
                "message": "Internal server error"
            }
        });
    }
}