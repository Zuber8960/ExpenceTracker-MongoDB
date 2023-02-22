const express = require('express');

const router = express.Router();

const userAuthentication = require('../middleware/auth');

const premiumController = require('../controllers/premium')

router.get('/show-leaderBoard', premiumController.getAllExpence);

router.get('/download', userAuthentication.authenticate , premiumController.download);

router.get('/oldFiles', userAuthentication.authenticate , premiumController.getOldFiles);

module.exports = router;