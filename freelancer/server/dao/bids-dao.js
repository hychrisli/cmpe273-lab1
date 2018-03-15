const {cnxPool, queryPromise, updatePromise, insertPromise} = require('./db');
const Crud = require('mysql-crud');
const projBidCrud = Crud(cnxPool, 'PROJECT_BID');

module.exports = {

  retrieveAll: ()=>{
    return queryPromise(projBidCrud.load, {});
  },

  retrieveBid: (bid_id)=>{
    return queryPromise(projBidCrud.load, {id: bid_id});
  },

  insertBid: (attr)=>{
    return insertPromise(projBidCrud.create, attr);
  },

  updateBid: (bid_id, attr)=>{
    return updatePromise(projBidCrud.update, {id: bid_id}, attr);
  }

};