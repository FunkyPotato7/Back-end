const jwt = require('jsonwebtoken');

const { ApiError } = require('../errors');

module.exports = {
    checkToken: async (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];

        try {
            if (!token) {
                throw new ApiError('Token was not provided', 401);
            }

            req.user = jwt.decode(token);
            next();
        } catch (e) {
            next(e);
        }
    },

    checkReadShops: async (req, res, next) => {
        try {
            const { permissions } = req.user;

            if (!permissions.includes('read:shops')) {
                throw new ApiError('Permission denied', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUpdateShops: async (req, res, next) => {
        try {
            const { permissions } = req.user;

            if (!permissions.includes('update:shops')) {
                throw new ApiError('Permission denied', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkReadFiles: async (req, res, next) => {
        try {
            const { permissions } = req.user;

            if (!permissions.includes('read:files')) {
                throw new ApiError('Permission denied', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUpdateFiles: async (req, res, next) => {
        try {
            const { permissions } = req.user;

            if (!permissions.includes('update:files')) {
                throw new ApiError('Permission denied', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    }


}