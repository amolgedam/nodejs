import jwt from 'jsonwebtoken';

import config from '../config/index.js';

export default async function Auth(req, res, next){
    try {
        /* Access authorize header to validate request */
        const token = req.headers.authorization.split(" ")[1];
        // if(!token) return res.status(401).send({error:"Authentication failed!"});

        /* retrive user details */
        const decodeToken = await jwt.verify(token, config.JWT_TOKEN);
        req.user = decodeToken;

        // res.json(decodeToken);
        next();

    } catch (error) {
        res.status(401).send({error:"Authentication failed!"});
    }
}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP: null,
        resetSession: false,
    }
    next();
}

