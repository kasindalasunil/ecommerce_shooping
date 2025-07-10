const express = require('express');
const {register,loginapi,getuser,updateuser} = require('../controllers/usercontroller')
// const {createproduct} = require('../controllers/productcontrollers');
// const upload = require('../middleware/authmiddleware');


const router = express.Router();

router.post('/signup', register);
router.post('/login',loginapi);
router.get('/user',getuser);



// router.post('/createproduct/:id', upload.any(), createproduct)

router.put('/update/:id',updateuser);




module.exports = router;
