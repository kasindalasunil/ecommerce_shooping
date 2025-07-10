const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const register = async(req,res)=>{
    // try{
    const {firstName,lastName,phone,email,address,role} = req.body;

    // check all the fields are coming  else send reuired fiels are missing

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
    // const resOb = {
    //     firstName : newUser.firstName,
    //     lastname : newUser.lastName,
    //     email: newUser.email

    // }

    // while sendnig the result dont send the password field
    res.status(200).json({message: "data retreived successfully"});

    // }catch(err){
    //     res.status(404).json({message:'invalid error'});
    // }


}
const loginapi = async(req,res)=>{
    try{
        const {email,password}  = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(400).send('invalid email id')
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).send('incorrect password')
        }
        const secretkey = "abc"
        const token = jwt.sign({
            id : user._id,
            username : 'GFG'
        },
            secretkey,{expiresIn:'1h'});

        res.json({token});


    }catch(err){
        res.status(500).send('internal server error');
    }

}
const getuser = async(req,res)=>{
    try{
        const auth = req.headers.authorization;
        if(!auth){
            res.status(400).send('invalid token');
        }
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token,'abc')
        res.status(200).json({user:decoded})
        const userId = decoded.id
        if(!userId){
            res.status(400).send('userid is invalid');
        }

    }catch(err){
        return res.status(500).send('internal server error')
    }

}
const updateuser = async(req,res)=>{
     try{
        const auth = req.headers.authorization;
        if(!auth){
            return res.status(400).send('invalid token');
        }
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token,'abc')
        // return res.status(200).json({message:'user data retreived'})
        const userId = decoded.id
        if(!userId){
            return res.status(400).send('userid is invalid');
        }
        const { firstName, lastName, address } = req.body;
        const userData = { firstName, lastName, address};
        const updatedData = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).send("invalid data");
    }
    return res
      .status(200)
      .json({ message: "data retrieved successfully", data: updatedData });
    }catch(err){
        return res.status(500).send('internal server error')
    }
}
module.exports = {register,
    loginapi,
    getuser,
    updateuser
};

