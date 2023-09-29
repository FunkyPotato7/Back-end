const express = require('express');
const cors = require('cors');
require('dotenv').config();

const config = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message)
});

app.listen( () => {
    console.log(`Server listen ${config.PORT}`);
});
