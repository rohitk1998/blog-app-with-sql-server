const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/likesquery.json');
const queries = JSON.parse(rawdata);



const request = {
    addLikeByPost : async(req , res)=>{
        try{
            if(req.body.postId !== null){
                const pool = await poolPromise
                const result = await pool.request()
                .input('postId' , sql.BigInt , req.body.postId)
                .input('userid' , sql.BigInt , req.body.userid)
                .query(queries.postLikesByUserAndPost)
                res.json(result);
            }
        }
        catch(err){
            res.status(500);
            res.send(err.message)
        }
    },
    getAllLikesByPostId : async(req,res)=>{
        try{
            if(req.body.postId !== null){
                const pool = await poolPromise
                const result = await pool.request()
                .input('postId' , sql.BigInt,req.body.postId)
                .query(queries.getALLLikesByPost)
                res.json(result);
            }
        }
        catch(err){
            res.status(500);
            res.send(err.message)
        }
    },
    deleteLikeByUser : async (req,res)=> {
        try{
            if(req.body.postId !== null && req.body.userid !== null ){
                const pool =  await poolPromise
                const result = await pool.request()
                .input('postId',sql.BigInt , req.body.postId)
                .input('userid',sql.BigInt,req.body.userid)
                .query(queries.deleteLikeByUser)
                res.json(result);
            }
        }
        catch(err){
            res.status(500);
            res.send(err.message)
        }
    }
}


module.exports = request ; 