import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from 'src/users/user.model';

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
    });
};

export const createRefreshToken = (user: User) => {
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d'
        }
    );
};

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('jid', token, {
        httpOnly: true,
        path: '/auth/refresh_token'
    });
};
