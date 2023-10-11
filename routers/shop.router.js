const router = require('express').Router();

const { authMiddleware } = require('../middlewares');
const { shopController } = require('../controllers');

router.get('/',
    authMiddleware.checkToken,
    authMiddleware.checkReadShops,
    shopController.getAll
);

router.get('/:id',
    authMiddleware.checkToken,
    authMiddleware.checkReadShops,
    shopController.getById
);

router.get('/:id/files',
    authMiddleware.checkToken,
    authMiddleware.checkReadFiles,
    shopController.getFiles
);

router.get('/:id/file',
    authMiddleware.checkToken,
    authMiddleware.checkReadFiles,
    shopController.getFile
);

router.post('/:id/file',
    authMiddleware.checkToken,
    authMiddleware.checkUpdateFiles,
    shopController.updateFile
);

router.post('/:id/addSnippets',
    authMiddleware.checkToken,
    authMiddleware.checkUpdateShops,
    shopController.addSnippets
);

router.post('/:id/removeSnippets',
    authMiddleware.checkToken,
    authMiddleware.checkUpdateShops,
    shopController.removeSnippets
);

router.post('/:id/enable',
    authMiddleware.checkToken,
    authMiddleware.checkUpdateShops,
    shopController.enable
);

router.post('/:id/disable',
    authMiddleware.checkToken,
    authMiddleware.checkUpdateShops,
    shopController.disable
);

module.exports = router;