const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

// ==========================
// JWT Authentication Middleware
// ==========================
const jwtAuthMiddleware = (req, res, next) => {
    
    // Extract the JWT token from the request headers
    // The header should be in format: Authorization: Bearer <token>
    const token = req.headers.authorization.split(' ')[1];
    
    // If token not provided, send 401 Unauthorized
    if(!token) return res.status(401).json({ error: "Unauthorized" });
    
    try {
        // Verify the JWT token using the secret from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch(err) {
        console.error(err);
        // If token verification fails, respond with 401
        res.status(401).json({ error: 'Invalid token' });
    }
}

// ==========================
// Function to generate JWT token
// ==========================
const generateToken = (userData) => {
    // userData can be any info you want to embed in the token (like username)
    return jwt.sign(userData, process.env.JWT_SECRET);
}

// Export both the middleware and token generator
module.exports = { jwtAuthMiddleware, generateToken }
