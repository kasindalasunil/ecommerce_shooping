const express = require('express');
const {register,loginapi,getuser,updateuser} = require('../controllers/usercontroller')
// const {createproduct} = require('../controllers/productcontrollers');
// const upload = require('../middleware/authmiddleware');


const userrouter = express.Router();

userrouter.post('/register', register);
userrouter.post('/login',loginapi);

userrouter.get('/get',getuser);




// router.post('/createproduct/:id', upload.any(), createproduct)

userrouter.put('/update/:id', updateuser);




module.exports = userrouter;
