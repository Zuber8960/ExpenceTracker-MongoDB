const express = require('express');
const router = express.Router();

const passwordController = require('../controllers/forgetPassword');

router.post('/forgotpassword' , passwordController.forgetpassword);

router.use('/resetpassword/:id' , passwordController.resetpassword);

router.use('/updatepassword/:id', passwordController.updatepassword);

module.exports = router;