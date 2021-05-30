const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/blogquery.json');
var queries = JSON.parse(rawdata);


const requests = {
    AddNewPost  : async(req,res)=> {
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
                .input('postTitle',sql.VarChar, req.body.posttitle)
                .input('postContent',sql.VarChar, req.body.postcontent)
                .input('postContentImage',sql.NVarChar, req.body.postcontentimage)
                .input('createrId',sql.Int,req.body.createrid)
                .input('createrName',sql.NVarChar,req.body.creatername)
                .input('createrTypeName',sql.NVarChar,req.body.creatertypename)
                .input('createrImage',sql.VarChar,req.body.createrimage)
                .input('createdDate',sql.NVarChar,Current_date)
                .input('statusofpost',sql.VarChar,req.body.status)
                .query(queries.AddNewPost)
                res.json(result);
                console.log(result);
        }
        catch(error){
            res.status(500)
            res.json({"error message"  : error.message})
        }
    },
    GetAllPosts: async (req, res)=> {
        try{
            const pool = await poolPromise ; 
            const result = await pool.request()
            .query(queries.GetAllPosts)
            res.json(result.recordset);
        }
        catch(error){
            res.status(500)
            res.send(error.message)
        }
    },
    GetSpecifiedPost : async (req, res)=> {
        try{
            if(req.body.postId !== null && req.body.postId !== ''){
            const pool = await poolPromise;
            const result = await pool.request()
            .input('postId' , sql.Int ,req.body.postId)
            .query(queries.GetSpecifiedPost)
            res.json(result.recordset);
            }
            else {
                res.send("Post not Found !!")
            }
        }
        catch(error){
            res.status(500)
            res.send(error.message)
        }
    },
    getIdOfLastInsertedPost : async(req,res)=> {
        try{
            const pool = await poolPromise;
            const result = await pool.request()
            .query(queries.getIdOfLastInsertedPost)
            res.json(result.recordset);
        }
        catch(error){
            res.status(500)
            res.send(error.message)
        }
    },
    updateStatusOfPost : async (req, res)=> {
        const {postId , status} = req.body ; 
        console.log(postId , status)
        try{
            if(req.body.postId !== null && req.body.postId !== ''){
            const pool = await poolPromise;
            const result = await pool.request()
            .input('postId',sql.Int,req.body.postId)
            .input('statusofpost',sql.VarChar,req.body.status)
            .query(queries.UpdatePostStatus)
            res.json(result);
            }
            else {
                res.send("Post not Found !!")
            }
        }
        catch(error){
            res.status(500)
            res.send(error.message)
        }
    }
}

module.exports = requests ; 
