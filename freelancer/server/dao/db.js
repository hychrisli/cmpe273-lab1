const mysql = require('mysql');

exports.cnxPool = mysql.createPool({
  connectionLimit: 20,
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'flc'
});

exports.selectPromise = (func, where) => {
  return new Promise((resolve, reject) => {
    func(where, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    })
  })
};
