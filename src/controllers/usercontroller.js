const User = require('../models/usermodel');
const bcrypt = require('bcrypt');


const userlogin = async(req,res)=>{
    try{
    const {firstName,lastName,phone,email,address,role} = req.body;

    const userinfo = await User.findOne({email})
    if(userinfo){
        res.status(400).send('email id is already registered')
    }
    const password = req.body.password
    const saltRounds = 10;
    const hassedpassword = await bcrypt.hash(password,saltRounds);
    console.log(hassedpassword);

    const newUser = {
        firstName,
        lastName,
        phone,
        email,
        password:hassedpassword,
        address,
        role
    }
    const updateresult = await new User(newUser).save();
    res.status(200).json({updateresult});
    }catch(err){
        res.status(404).json({message:'invalid error'});

    }


}
module.exports = {userlogin};

