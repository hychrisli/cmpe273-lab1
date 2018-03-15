const {cnxPool, queryPromise} = require('./db');
const Crud = require('mysql-crud');
const projSkillCrud = Crud(cnxPool, 'PROJECT_SKILL');

module.exports = {

  retrieve: (filter)=>{
    return queryPromise(projSkillCrud.load, filter);
  },

  insert: (attr)=>{
    return queryPromise(projSkillCrud.create, attr);
  },
};