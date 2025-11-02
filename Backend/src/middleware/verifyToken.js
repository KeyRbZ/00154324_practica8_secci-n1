import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token es requerido' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), 'tu_secreto_jwt');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export default verifyToken;