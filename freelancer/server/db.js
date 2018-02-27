const mysql = require('mysql');
const async = require('async');

export const cnxPool = mysql.createPool({
  connectionLimit:20,
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'flc'
});

cnxPool.getConnection((err, cnx) =>{
  if ( err ) {
    cnx.release();
    console.log("Error");
  }
  else{
    console.log("Connected");
  }
});
