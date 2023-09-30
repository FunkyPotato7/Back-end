const express = require('express');
const cors = require('cors');
require('dotenv').config();

const config = require('./config/config');
const { shopRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/admin/shops', shopRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message)
});

app.listen(config.PORT, async () => {
    console.log(`Server listen ${config.PORT}`);
});
