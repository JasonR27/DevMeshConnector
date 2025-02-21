import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import { auth } from '../middleware/auth';
import dotenv from 'dotenv';


dotenv.config();


const SECRET_KEY: string = process.env.SUPABASE_JWT_SECRET || 'default_secret_key';


const router = new express.Router();

router.use(cookieParser());

router.post('/refreshtoken', auth, async (req, res): Promise<any> => {
    console.log('entered refresh token');
    const prevToken = req.cookies.token;
    console.log('Extracted token: ', prevToken);
    const currentDate = new Date().toISOString();

    if (!prevToken) {
        console.log('token in cookie not found');
        return res.status(401).json({ valid: false, error: 'Invalid token' });
    }

    try {
        const decoded = jwt.verify(prevToken, SECRET_KEY); // Ensure SECRET_KEY is correct
        console.log('verifytoken endpoint Token is valid, decoded token: ', decoded);

        if (decoded) {
            const token = jwt.sign({ id: decoded.id, email: decoded.email, loginDate: currentDate }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // if true then cookie is only send through https
                sameSite: 'strict',
                maxAge: 3600 * 10000, // 1 hour in milliseconds
            }).send({ redirectUrl: '/myprofiles' });
        }
    } catch (error) {
        console.error('Token verification error: ', error);
        return res.status(401).json({ valid: false, error: 'Invalid token' });
    }

})

export default router;