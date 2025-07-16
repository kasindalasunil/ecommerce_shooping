const jwt = require('jsonwebtoken');
const verifyToken = async(req,res,next)=>{
try{
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).send('invalid token');
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token,'abc')

    const userId = decoded.id
    console.log(userId);

    req.user= userId

    next();
    


    }catch(err){
        console.log(err)
        res.status(500).send('invalid token')
    }
}
module.exports = verifyToken;
