const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const verifyToken = async(req,res,next)=>{
try{
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).send('invalid token');
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token,'abc')
    //  const user = await User.findById(decoded.id);
    // if (!user) {
    //   return res.status(404).send('User not found');
    // }

    // const user = decoded.id
    // console.log(user);

    req.user= decoded;

    next();
    


    }catch(err){
        console.log(err)
        res.status(500).send('invalid token')
    }
}
module.exports = verifyToken;
