const {cnxPool, queryPromise, updatePromise} = require('./db');
const Crud = require('mysql-crud');
const projCrud = Crud(cnxPool, 'PROJECT');

module.exports = {

  retrieveAll: ()=>{
    return queryPromise(projCrud.load, {});
  },

  retrieve: (project_id)=>{
    return queryPromise(projCrud.load, {id: project_id});
  },

  insert: (attr)=>{
    return queryPromise(projCrud.create, attr);
  },

  update: (project_id, attr)=>{
    return updatePromise(projCrud.update, {id: project_id}, attr);
  }

};