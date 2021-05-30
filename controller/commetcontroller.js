const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/commentquery.json');
var queries = JSON.parse(rawdata);




const commentrequest = {
    AddCommentByUserOnPosts : async(req,res)=> {
        console.log(req.body)
        var month= ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    const Dates = new Date();
    const current_month = Dates.getMonth();
    const current_time = Dates.toLocaleTimeString();
    const current_date = Dates.getDate();
    const current_year = Dates.getFullYear();
    const current_month_name =()=>{
       for(var i = 0 ; i <= month.length ; i++){
           if((current_month) === i){
             return month[current_month]
           }
       }
    }
    await current_month_name()
    console.log(current_date , current_month_name() ,current_year, current_time)
    const Current_date = (current_date +' '+ current_month_name() +' '+ current_year + '  ' + current_time).toString();
    try {
        const pool = await poolPromise
        const result = await pool.request()
       .input('postId',sql.BigInt, req.body.postId)
       .input('userid',sql.BigInt, req.body.userid)
       .input('userimage',sql.NVarChar, req.body.userimage)
       .input('username',sql.NVarChar, req.body.username)
       .input('commenttext',sql.NVarChar, req.body.commenttext)
       .input('status',sql.NVarChar,req.body.status)
       .input('commentcreatedon',sql.NVarChar,Current_date)
       .query(queries.AddCommentByUserOnPosts)
       res.json(result);
       console.log(result);
}
catch(error){
   res.status(500)
   res.json({"error message"  : error.message})
}
},
GetAllCommentsByPostId: async (req, res)=> {
try{
   const pool = await poolPromise ; 
   const result = await pool.request()
   .input('postId',sql.BigInt,req.body.postId)
   .query(queries.GetAllCommentsByPostId)
   res.json(result.recordset);
}
catch(error){
   res.status(500)
   res.send(error.message)
}
    }
}

module.exports = commentrequest ; 