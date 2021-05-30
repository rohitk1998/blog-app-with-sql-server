const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/productqueries.json');
var queries = JSON.parse(rawdata);



const requests =
{
    getALLData : async(req , res)=> {
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .query(queries.getAllProduct)
            res.json(result.recordset)
        } catch (error) {
          res.status(500)
          res.send(error.message)
        }
    } ,
    addNewProduct: async (req , res)=> {
        console.log(req.body.productId)
       try{
           if(req.body.productId !== undefined || req.body.productId !== null){
            const pool = await poolPromise
            const result = await pool.request()
            .input('productId' , sql.Int , req.body.productId)
            .input('productName' , sql.VarChar , req.body.productName)
            .input('productCategory' , sql.VarChar , req.body.productCategory)
            .input('productPrice' , sql.VarChar , req.body.productPrice)
            .query(queries.addNewProduct)
            res.json(result);
           }
           else {
            res.send('Please fill all the details!')
           }
       }
       catch (error) {
        res.status(500)
        res.send(error.message)
    }
    },
    deleteProduct: async (req,res)=>{
        try {
            if(req.body.productId != undefined ) {
              const pool = await poolPromise
                const result = await pool.request()
                .input('productId',sql.VarChar,req.body.productId)
                .query(queries.deleteProduct)
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


module.exports = requests; 