const router = require('express').Router();

const { shopController } = require('../controllers');

router.get('/', shopController.getAll);

router.get('/:id', shopController.getById);

router.get('/:id/files', shopController.getFiles);

router.get('/:id/file', shopController.getFile);

router.post('/:id/file', shopController.updateFile);

router.post('/:id/addSnippets', shopController.addSnippets);

router.post('/:id/removeSnippets', shopController.removeSnippets);

router.post('/:id/enable', shopController.enable);

router.post('/:id/disable', shopController.disable);

module.exports = router;