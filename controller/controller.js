const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MainController {
    async getAllUser(req , res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query(queries.getAllUser)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addNewUser(req , res){
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
        if(req.body.firstname != null && req.body.email != null && req.body.password != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('firstname',sql.VarChar , req.body.firstname)
          .input('lastname',sql.VarChar , req.body.lastname)
          .input('gender',sql.VarChar,req.body.gender)
          .input('email',sql.VarChar , req.body.email)
          .input('password',sql.VarChar , req.body.password)
          .input('image',sql.VarChar,req.body.image)
          .input('role',sql.VarChar , req.body.role)
          .input('dateofbirth',sql.VarChar , req.body.dateofbirth)
          .input('registereddate',sql.VarChar, Current_date)
          .query(queries.addNewUser)
          res.json(result);
          console.log(result)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async updateData(req , res){
      try {
        if(req.body.password != null && req.body.name != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('newPassword',sql.VarChar , req.body.password)
          .input('userName',sql.VarChar,req.body.name)
          .query(queries.updateUserDetails)
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteData(req , res){
      try {
        if(req.body.name != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('userName',sql.VarChar,req.body.name)
            .query(queries.deleteUser)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MainController()
module.exports = controller;