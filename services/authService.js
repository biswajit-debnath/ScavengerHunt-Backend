const db = require("./../config/config")

const getUserByUserName =async (username)=> {
    let userData={}
    const res =await db.query(
        `SELECT * FROM users WHERE userName = ($1)`,
        ['admin2'])
    if(res.rows.length == 0)
        throw {status:404, message: "No user found"}
    return res.rows[0];
}

module.exports= {
    getUserByUserName
}