const db = require("./../config/config")

const storeNotification =async (data)=> {
    await db.query(
        `Insert into new_notification(id,userId,message,timeStamp) Values($1,$2,$3,$4,)`,
        [data.id, data.userId, data.message, data.timeStamp])
    
    return {message:"Successfully added"};
}

module.exports= {
    storeNotification
}