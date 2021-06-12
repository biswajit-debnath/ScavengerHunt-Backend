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



module.exports= {
    getUserInfoById,
    getAllUsers
}