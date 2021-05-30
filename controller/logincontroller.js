const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/loginquery.json');
var queries = JSON.parse(rawdata);



const request = {
     
    getUserLoggedIn : async (req , res)=> {
            console.log(req.body);
            try{
                if(req.body.email !== null && req.body.email !== ''){
                    const pool = await poolPromise
                    const result = await pool.request()
            .input('email', sql.VarChar , req.body.email)
            .input('password' , sql.VarChar , req.body.password)
            .query(queries.getUserLoggedIn)
            res.json(result.recordset);
                }
                else {
                   res.json({"message" : "Please Fill the Email and Password !!"})
                }
            }
            catch (error) {
                res.status(500)
                res.send(error.message)
              }
    }
}

module.exports = request ; 