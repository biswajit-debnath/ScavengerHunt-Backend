const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {authService} = require("./../services")

const login =async (req, res) => {
    try{
        const {username} = req.body
        const userData =await authService.getUserByUserName(username);
        
        res.json(userData);

    }catch(err){
        console.log(err);
        res.status(err.status).send(err.message)
    }
    

}


module.exports ={
    login
}