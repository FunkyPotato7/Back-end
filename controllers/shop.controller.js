const fs = require('fs');

const shopDB = require('../config/shop.json');
const filesDB = require('../config/files.json');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            res.status(200).json(shopDB);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if(shopDB[id - 1]){
                res.status(200).json(shopDB[id - 1]);
            } else {
                res.status(404).json("This user doesn't exist")
            }

        } catch (e) {
            next(e);
        }
    },

    getFiles: async (req, res, next) => {
        try {
            res.status(200).json(filesDB);
        } catch (e) {
            next(e);
        }
    },

    getFile: async (req, res, next) => {
        try {
            res.status(200).json({key: 'key', base64content: 'content'})
        } catch (e) {
            next(e);
        }
    },

    createFile: async (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },

    addSnippets: async (req, res, next) => {
        try {
            res.status(200).json('Snippets added');
        } catch (e) {
            next(e);
        }
    },

    removeSnippets: async (req, res, next) => {
        try {
            res.status(200).json('Snippets removed');
        } catch (e) {
            next(e);
        }
    },

    enable: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (shopDB[id - 1]) {
                fs.readFile('./config/shop.json', (err, data) => {
                    const parsedData = JSON.parse(data);
                    parsedData[id - 1].isActive = true;

                    fs.writeFile(`./config/shop.json`, JSON.stringify(parsedData), (err) => {
                        if (err === null) {
                            res.status(200).json(`Shop ${parsedData[id - 1].name} enabled`);
                        } else {
                            res.status(500).json(err);
                        }
                    });
                });
            } else {
                res.status(404).json('Shop with this id is not exist');
            }
        } catch (e) {
            next(e);
        }
    },

    disable: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (shopDB[id - 1]) {
                fs.readFile('./config/shop.json', (err, data) => {
                    const parsedData = JSON.parse(data);
                    parsedData[id - 1].isActive = false;

                    fs.writeFile(`./config/shop.json`, JSON.stringify(parsedData), (err) => {
                        if (err === null) {
                            res.status(200).json(`Shop ${parsedData[id - 1].name} disabled`);
                        } else {
                            res.status(500).json(err);
                        }
                    });
                });
            } else {
                res.status(404).json('Shop with this id is not exist');
            }
        } catch (e) {
            next(e);
        }
    },
}