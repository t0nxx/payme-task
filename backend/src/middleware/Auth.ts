import { verify } from 'jsonwebtoken';
import { JWT_KEY } from '../config/config';

export default (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) { return res.status(401).send({ error: true, data: 'Invalid Token' }); }
    try {
        const decode = verify(token, JWT_KEY);
        if (decode) { req.user = decode; }
        next();
    } catch (error) {
        return res.status(401).send({ error: true, data: 'Invalid Token' });
    }
};
