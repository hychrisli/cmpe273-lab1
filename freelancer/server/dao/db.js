const mysql = require('mysql');

exports.cnxPool = mysql.createPool({
  connectionLimit: 20,
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'flc'
});

exports.countPromise = (table) => {
  return new Promise((resolve, reject) => {
    this.cnxPool.query('SELECT COUNT(*) cnt FROM ' + table,
      (error, results) => {
      if (error) return reject(error);
      resolve(results);
    })
  })
};

exports.queryPromise = (func, where, pagin={}) => {
  return new Promise((resolve, reject) => {
    func(where, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    }, pagin)
  })
};

exports.insertPromise = (func, where) => {
  return new Promise((resolve, reject) => {
    func(where, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    })
  })
};

exports.updatePromise = (func, slct, attr) => {
  return new Promise((resolve, reject) => {
    func(slct, attr, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    })
  })
};

exports.deletePromise = (func, where) => {
  return new Promise((resolve, reject) => {
    func(where, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    })
  })
};