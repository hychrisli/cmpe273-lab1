const express = require('express');
const router = express.Router();
const userDao = require('../dao/users-dao');
const {promiseResponse} = require('./ctrls');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * /users:
 *  get:
 *    description: Retrieve all users
 *    tags:
 *       - users
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: users
 *        schema:
 *          $ref: '#/definitions/Users'
 */
router.get('/', (req, res) => {
  promiseResponse(userDao.retrieveAll(), res);
});


/**
 * @swagger
 * /users/{username}:
 *  get:
 *    description: Retrieve User Info
 *    tags:
 *       - users
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
router.get('/:username', function (req, res, next) {
  promiseResponse(userDao.retrieve(req.params.username), res);
});


/**
 * @swagger
 * /users:
 *  post:
 *    description: Create a User
 *    tags:
 *       - users
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        description: Username to use for login.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        description: User's email.
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: user created
 */
router.post('/', function (req, res, next) {
  let form = req.body;
  console.log(form);
  console.log(form.password);
  form.password = bcrypt.hashSync(form.password, 10);
  promiseResponse(userDao.insert(form), res);
});

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: login a user
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        description: Username to use for login.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: login success
 */
router.post('/login', function (req, res, next) {
  const username = req.body.username;
  console.log(req.body);
  console.log(req.body.password);
  const promise = userDao.retrieve(username);
  promise.then((val)=>{
    if (val.length > 0) {
      console.log(val);
      if(bcrypt.compareSync(req.body.password, val[0].password)){
        return res.send({login: "success"});
      }
      else res.status(400).send({login: "wrong password"});
    }
    else res.status(404).send({login: "no such user"});
  }).catch((err) => {res.send(err)});
});


module.exports = router;
