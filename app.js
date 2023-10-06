const express = require('express');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const cors = require('cors');
require('dotenv').config();

const config = require('./config/config');
const { shopRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const checkJwt = auth({
    audience: 'http://localhost:5000/',
    issuerBaseURL: 'https://dev-qu4qfo5qt4rxpul7.us.auth0.com/'
});

const checkScopes = requiredScopes('read:shops');

app.use('/api/admin/shops', checkJwt, checkScopes, shopRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
});

app.listen(config.PORT, async () => {
    console.log(`Server listen ${config.PORT}`);
});
