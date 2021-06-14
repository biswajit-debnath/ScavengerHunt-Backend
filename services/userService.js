const db = require("./../config/config")

const getUserInfoById =async (id)=> {
    const res =await db.query(
        `SELECT * FROM user_details WHERE userId = ($1)`,
        [id])
    if(res.rows.length == 0)
        throw {status:404, message: "No user found"}
    return res.rows[0];
}

const getAllUsers =async (adminId)=> {
    const res =await db.query(
        `SELECT * FROM user_details WHERE Not userId = ($1)`,
        [adminId])
    if(res.rows.length == 0)
        throw {status:404, message: "No user found"}

    return res.rows;
}

const getUsersByPin =async (pin)=> {
    const res =await db.query(
        `select userId,institutionName,branchName from user_details where userId In (select userId from pincode_to_user where pincode = ($1))`,
        [pin])
    if(res.rows.length == 0)
        throw {status:404, message: "No user found"}
    return res.rows;
}


const getAllPincodesById =async (userId)=> {
    let pincodeArrays=[]
    const res =await db.query(
        `SELECT pincode FROM pincode_to_user WHERE userId = ($1)`,
        [userId])
    
    Object.values(res.rows).forEach(result=> pincodeArrays.push(result.pincode))
    return pincodeArrays;
}


module.exports= {
    getUserInfoById,
    getAllUsers,
    getUsersByPin,
    getAllPincodesById
}