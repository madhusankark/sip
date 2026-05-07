const { verifyJWT } = require('../utility/authManager');

const authMiddleware = (req, res, next) => {

    try {

        const token = req.headers.token;
         console.log(token);
        if(!token)
        {
            return res.status(401).json({
                error: "Token missing"
            });
        }

        const decoded = verifyJWT(token);

        if(!decoded)
        {
            return res.status(401).json({
                error: "Invalid token"
            });
        }

        req.user = decoded;

        next();

    }
    catch(error)
    {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
};

module.exports = authMiddleware;