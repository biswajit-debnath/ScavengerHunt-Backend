const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {authService} = require("./../services")

const login =async (req, res) => {
    try{
        const {username,password} = req.body
        const userData =await authService.getUserByUserName(username)
        
        const validPass = await bcrypt.compare(password, userData.password)
        if(!validPass)
            throw {status:401, message: "Unauthorized"}
        
        const authToken = jwt.sign(
            {userId:userData.userId},
            process.env.Secret
        )
        const resData = {authToken, userId:userData.userid, userType:userData.usertype}
        res.status(200).json(resData)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}


module.exports ={
    login
}