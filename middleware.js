const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    console.log("Auth Header Received:", token);  //

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        console.log("Extracted Token:", cleanToken);

        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);  

        req.user = decoded;  
        next();
    } catch (error) {
        console.error("Token Verification Failed:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;