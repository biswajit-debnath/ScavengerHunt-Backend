const { userService } = require("../services")

const getUserInfoById = async (req, res) => {
    try{
        const id = req.params.id

        const userData = await userService.getUserInfoById(id)

        res.status(200).json(userData)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}
    
const getAllUsers = async (req, res) => {
    try{
        const {adminid} = req.params
        const users = await userService.getAllUsers(adminid)

        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}
    
const getUsersByPin = async (req, res) => {
    try{
        const {pin} = req.params
        const users = await userService.getUsersByPin(pin)

        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}

module.exports ={
    getUserInfoById,
    getAllUsers,
    getUsersByPin
}