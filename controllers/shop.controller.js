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
                res.status(404).json(`Shop with id: ${id} doesn't exist`)
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
            const { key } = req.query;
            let file = [];

            fs.readFile('./config/file.json',  (err, data) => {
                const parsedData = JSON.parse(data);

                file = parsedData.filter(file => file.key === key);

                if (file[0]) {
                    res.status(200).json(file[0]);
                } else {
                    res.status(201).json({});
                }
            })
        } catch (e) {
            next(e);
        }
    },

    updateFile: async (req, res, next) => {
        try {
            const { key } = req.query;
            const { base64content } = req.body;

            let changedEl = {};

            fs.readFile('./config/file.json', (err, data) => {
                let parsedData = JSON.parse(data);
                parsedData = parsedData.map(el => {
                    if (el.key === key) {
                        el.base64content = base64content;
                        changedEl = el;
                    }

                    return el;
                })

                fs.writeFile(`./config/file.json`, JSON.stringify(parsedData), (err) => {
                    if (err === null) {
                        res.status(200).json(changedEl);
                    } else {
                        res.status(500).json(err);
                    }
                });
            });
        } catch (e) {
            next(e);
        }
    },

    addSnippets: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (shopDB[id - 1]) {
                await fs.readFile('./config/shop.json', async (err, data) => {
                    const parsedData = JSON.parse(data);
                    parsedData[id - 1].snippetsAdded = true;

                    await fs.writeFile(`./config/shop.json`, JSON.stringify(parsedData), (err) => {
                        if (err !== null) {
                            res.status(500).json(err);
                        }
                    });
                });
            } else {
                res.status(404).json('Shop with this id is not exist');
            }

            res.status(200).json(`Snippets added`);
        } catch (e) {
            next(e);
        }
    },

    removeSnippets: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (shopDB[id - 1]) {
                await fs.readFile('./config/shop.json', async (err, data) => {
                    const parsedData = JSON.parse(data);
                    parsedData[id - 1].snippetsAdded = false;

                    await fs.writeFile(`./config/shop.json`, JSON.stringify(parsedData), (err) => {
                        if (err === null) {
                            res.status(200).json(`Snippets removed`);
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

    enable: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (shopDB[id - 1]) {
               await fs.readFile('./config/shop.json', async (err, data) => {
                    const parsedData = JSON.parse(data);
                    parsedData[id - 1].isActive = true;

                    await fs.writeFile(`./config/shop.json`, JSON.stringify(parsedData), (err) => {
                        if (err === null) {
                            res.status(200).json(`Shop enabled`);
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
               await fs.readFile('./config/shop.json', async (err, data) => {
                    const parsedData = JSON.parse(data);
                    parsedData[id - 1].isActive = false;

                    await fs.writeFile(`./config/shop.json`, JSON.stringify(parsedData), (err) => {
                        if (err === null) {
                            res.status(200).json(`Shop disabled`);
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