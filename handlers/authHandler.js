const jwt = require('jsonwebtoken');

const verifyHash = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    //Check if token is not in header
    if(token == null) return res.status(401).send("Unauthorized1")

    try {
        jwt.verify(token, process.env.Secret, (error,payload)=> {
            if(error) return res.status(401).send("Unauthorized3")
           
            next();
        });
    }
    catch(error){
        return res.status(401).send("Unauthorized2")
    }
}


module.exports ={
    verifyHash
}