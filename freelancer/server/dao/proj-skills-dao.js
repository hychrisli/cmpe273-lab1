const {cnxPool, queryPromise, insertPromise} = require('./db');
const Crud = require('mysql-crud');
const projSkillCrud = Crud(cnxPool, 'PROJECT_SKILL');

module.exports = {

  retrieve: (filter)=>{
    return queryPromise(projSkillCrud.load, filter);
  },

  insert: (attr)=>{
    return insertPromise(projSkillCrud.create, attr);
  },
};