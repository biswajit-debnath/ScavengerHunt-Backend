const db = require("./../config/config")

const getUserByUserName =async (username)=> {
    const res =await db.query(
        `SELECT * FROM users WHERE userName = ($1)`,
        [username])
    if(res.rows.length == 0)
        throw {status:404, message: "No user found"}
    return res.rows[0];
}

module.exports= {
    getUserByUserName
}