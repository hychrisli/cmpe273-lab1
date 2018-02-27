const express = require('express');
const router = express.Router();
const userDao = require('../dao/users-dao');
const {promiseResponse} = require('./ctrls');

/**
 * @swagger
 * /users:
 *  get:
 *    description: Retrieve all users
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: users
 *        schema:
 *          $ref: '#/definitions/Users'
 */
router.get('/', (req, res) => {
  promiseResponse (userDao.retrieveAll(), res);
});


/**
 * @swagger
 * /users/{username}:
 *  get:
 *    description: Retrieve User Info
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        description: username
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: a user
 *        schema:
 *          $ref: '#/definitions/User'
 */
router.get('/:username', function(req, res, next){
  promiseResponse(userDao.retrieve(req.params.username), res);
});

module.exports = router;



