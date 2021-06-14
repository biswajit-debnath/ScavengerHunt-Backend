const db = require("./../config/config")

//Helpers
const dataHandlerForInsertQuery= (data) => {
    const result=[]
    data.users.forEach(user=> result.push(user, data.message	))
    return result
}

const insertQueryCreatorMultipleUser =(userIds) => {
    let querString="Insert Into new_notification(userId,message,timeStamp) Values"
    userIds.forEach((user,i)=> {
        if(i != userIds.length-1)
            querString+="("+ "$"+ (1+(i)*2)+ ","+"$"+ (2+(i)*2)+ ","+ "clock_timestamp()"+ ")"+","
        else
            querString+="("+ "$"+ (1+(i)*2)+ ","+"$"+ (2+(i)*2)+ ","+ "clock_timestamp()"+ ")"

        })
    return querString;
}
////////////////////////////////


const storeNotification =async (data)=> {
    console.log(data.users,"delime",insertQueryCreatorMultipleUser(data.users),dataHandlerForInsertQuery(data));
    await db.query(
        `${insertQueryCreatorMultipleUser(data.users)}`,
        dataHandlerForInsertQuery(data))
    
    return {message:"Successfully added"};
}




const newNotificationCountByid =async (userId) => {
    const res =await db.query(
        `Select count(*) from new_notification where userId=($1)`,
        [userId])
    if(res.rows.length == 0)
        throw {status:404, message: "No user found"}
        console.log(res.rows[0]);
    return res.rows[0];
}


const getAllNotificationByUserId =async (userId) => {
    const result={}
    const res1 =await db.query(
        `select * from new_notification where userId=($1) order by timeStamp Desc`,
        [userId])
    const res2 =await db.query(
        `select * from old_notification where userId=($1) order by timeStamp Desc`,
        [userId])
    result["new"]= res1.rows
    result["old"] = res2.rows
    
    return result;
}

const transferNewNotificationsToOld =async (userId) => {
    const res1 =await db.query(
        `Insert Into old_notification(Select * from new_notification where userId=($1))`,
        [userId])
    const res2 =await db.query(
        `Delete from new_notification where userId=($1)`,
        [userId])

    return {message:"successfully updated"}
    
}




module.exports= {
    storeNotification,
    newNotificationCountByid,
    getAllNotificationByUserId,
    transferNewNotificationsToOld
}