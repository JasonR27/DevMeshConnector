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
        console.log('refreshtoken endpoint Token is valid, decoded token: ', decoded);
        console.log('decoded.loginDate: ', decoded.loginDate)
        const loginDate = new Date(decoded.loginDate).getTime();
        // console.log('decoded.loginDate: ', typeof decoded.loginDate)


        // if (decoded) {
            console.log('decoded.loginDate: ', decoded.loginDate)
            console.log('decoded: ', decoded)
            const currentDateInMillis = new Date().getTime();
            const timeDifference = currentDateInMillis - loginDate;

            // Define 3 days in milliseconds
            const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; // 3 days * 24 hours * 60 minutes * 60 seconds * 1000 ms

            if (timeDifference > threeDaysInMillis) {
                console.log('Login date is more than 3 days ago');
                return res.status(401).json({ valid: false, error: `Couldn't get refresh token because token is too old, please log in again` });
            }

            const token = jwt.sign({ id: decoded.id, email: decoded.email, loginDate: currentDate }, SECRET_KEY, { expiresIn: '1h' });
            console.log('new refresh token generated successfully')
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // if true then cookie is only send through https
                sameSite: 'strict',
                maxAge: 3600 * 10000, // 1 hour in milliseconds
            }).send({ redirectUrl: '/myprofiles' });
            console.log('new token cookie set');
        // }
    } catch (error) {
        console.error('Token verification error: ', error);
        return res.status(401).json({ valid: false, error: 'Invalid token' });
    }

})

export default router;