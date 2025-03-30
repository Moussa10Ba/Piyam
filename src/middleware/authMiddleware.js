import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify the token using the secret key and decode the jwt payload
        const decoded = jwt.verify(token, "MySecret123");

        req.user = decoded; // Attach user info to request object
        console.log(decoded)
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}