const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/tagquery.json');
var queries = JSON.parse(rawdata);

const tagrequests = {
    AddPostTags : async(req,res)=> {
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
      try{
          if(req.body.tagname !== ''){
            const pool = await poolPromise
            const result = await pool.request()
           .input('tagname',sql.VarChar, req.body.tagname)
           .input('postId',sql.BigInt, req.body.postid)
           .input('createddate',sql.VarChar,Current_date)
           .input('posttitle' , sql.VarChar ,req.body.title)
           .input('postcontent',sql.VarChar, req.body.content)
           .input('postcontimage',sql.VarChar,req.body.image)
           .input('createrid' , sql.BigInt , req.body.id)
           .input('createrimage',sql.VarChar, req.body.createrimage)
           .input('creatername',sql.VarChar, req.body.name)
           .query(queries.AddPostTags)
           res.json(result);
          }
      }
    catch(error){
        res.status(500)
        res.send(error.message);
    }
    },
    GetAllTags:async(req,res)=>{
        try{
              const pool = await poolPromise
              const result = await pool.request()
             .query(queries.GetAllTags)
             res.json(result);
            
        }
      catch(error){
          res.status(500)
          res.send(error.message);
      }
    },
    GetTagsRelatedPostByTag:async(req,res)=> {
      try{
        if(req.body.tagname !== ''){
          const pool = await poolPromise
          const result = await pool.request()
         .input('tagname',sql.VarChar, req.body.tagname)
         .query(queries.GetTagsRelatedPostByTag)
         res.json(result.recordsets)
        }
    }
  catch(error){
      res.status(500)
      res.send(error.message);
  }
    }
}

module.exports = tagrequests ;