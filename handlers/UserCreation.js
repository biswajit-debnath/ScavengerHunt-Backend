const XLSX = require('xlsx'); 
const { extractUserIds } = require('../helper');
const db = require("./../config/config")

const workbook = XLSX.readFile('./BeetleNut_Data.xlsx'); 
const sheet_name_list = workbook.SheetNames; 
let data= JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
data = JSON.parse(data);



const insertPincodeQueryStringHepler =(pincodes) => {
    let querString="Insert Into pincode_to_user(userId, pincode) Values"

    pincodes.forEach((pin,i)=>{
        if(i != pincodes.length-1)
            querString+="("+ "$"+ (1+(i)*2)+ ","+"$"+ (2+(i)*2)+ ")"+","
        else
            querString+="("+ "$"+ (1+(i)*2)+ ","+"$"+ (2+(i)*2)+ ")"
    })
    return querString;
}



const dataHandlerForPincodeInsertQuery= (uid,pincodes) => {
    const result=[]
    pincodes.forEach(pincode=> result.push(uid, pincode.trim()))
    return result
}



const createAUser =async (userName,userId, data)=> {
    const res1 =await db.query(
        `Insert Into users(userId, userName, password, userType) Values(($1),($2),($3),($4))`,
        [userId,userName,"$2a$10$r20Qq1IuMCStKivx3xyA..Ccemrmubt3bzfwew8PDNynUw1WOB4hK","user"])

    console.log("Users Table Updated");
    const res2 =await db.query(
        `Insert Into user_details(userId,institutionName, branchName, address, city, contactNumbers, branchIncharge)
        Values(($1),($2),($3),($4),($5),($6),($7))`,
        [userId, data['Insitution Name'], data['Branch Name'], data['Address'], data['City'], data['Contact Number'],
        data['Branch Incharge']
    ])
    console.log("User_Detail Table Updated");

    const pincodes = data['Pincode covered'].split(",");
    const res3 =await db.query(
        insertPincodeQueryStringHepler(pincodes),
        dataHandlerForPincodeInsertQuery(userId,pincodes)
    )
    console.log("Pincodes are added");
}

//Create all available user present in the file
const smallLettlerOffset=95;
for(let i=0; i<=data.length;i++){
    let y=i%26;
    createAUser( String.fromCharCode(97+Math.trunc(i/26))+(String.fromCharCode(y+97)),i+1,data[i])
}

