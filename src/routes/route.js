const express = require('express');
const {userlogin} = require('../controllers/usercontroller')

const router = express.Router();

router.post('/user', userlogin);

module.exports = router;
