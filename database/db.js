const sql = require('mssql/msnodesqlv8')

const config = {
    user: 'devuser',
	password: 'd3vus3r',
	server: 'Kas0002\\SQLEXPRESS',
	options: {
		instance: 'SQLEXPRESS',
		database: 'Kaspro_Blog',
	}
} 
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}