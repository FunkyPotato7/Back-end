const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const jwt = require('jsonwebtoken');

const { ApiError } = require('../errors');

module.exports = {
    auth: () => auth({
        audience: 'http://localhost:5000/',
        issuerBaseURL: 'https://dev-qu4qfo5qt4rxpul7.us.auth0.com/',
        tokenSigningAlg: 'RS256'
    }),

    checkToken: async (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];

        try {
            if (!token) {
                throw new ApiError('Token was not provided', 401);
            }

            const decodedToken = jwt.decode(token);
            console.log(decodedToken);

            const checkScopes = requiredScopes('read:shops');

            console.log(checkScopes);

            next();
        } catch (e) {
            next(e);
        }
    }
}