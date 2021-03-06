const express = require('express');
const router = express.Router();
const userDao = require('../dao/users-dao');
const {
  promiseGetResponse,
  promisePostResponse,
  promiseGetOneResponse,
  promisePutOneResponse
} = require('./ctrls');
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
  promiseGetResponse(userDao.retrieveAll(), res, 200);
});


/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: Retrieve User Info
 *    tags:
 *       - users
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        description: user ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: a user
 *        schema:
 *          $ref: '#/definitions/User'
 */
router.get('/:id', function (req, res, next) {
  console.log(req.params.id);
  const id = req.params.id;
  let promise;
  if ( id.match(/^-{0,1}\d+$/)){
    promise = userDao.retrieve(Number(id));
  }
  else {
    promise = userDao.retrieveByUserName(id);
  }
  promiseGetOneResponse(promise, res, 200);
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
  promisePostResponse(userDao.insert(form), req, res, 201);
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
  const promise = userDao.retrieveByUserName(username);
  promise.then((val)=>{
    if (val.length > 0) {
      console.log(val);
      if(bcrypt.compareSync(req.body.password, val[0].password)){
        return res.send(val[0]);
      }
      else res.status(400).send({login: "wrong password"});
    }
    else res.status(404).send({login: "no such user"});
  }).catch((err) => {res.send(err)});
});


/**
 * @swagger
 * /users/{username}:
 *  put:
 *    description: Update a User
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
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: email
 *        description: User's email.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: first_name
 *        description: first name of the user.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: last_name
 *        description: last name of the user.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: about_me
 *        description: my bio.
 *        in: formData
 *        required: false
 *        type: string
 *    responses:
 *      201:
 *        description: user created
 */
router.put('/:username', function (req, res, next) {
  console.log(req.body);
  const username = req.params.username;
  let form = req.body;

  if (form.password !== undefined)
    form.password = bcrypt.hashSync(form.password, 10);
  promisePutOneResponse(
    userDao.update(username, form),
    userDao.retrieve(username), res, 200);
});

module.exports = router;
