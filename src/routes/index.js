const { Router } = require('express');
const router = Router();

router.use(require('./print'));
router.use(require('./clients'));

module.exports = router;