const express = require('express');
const router = express.Router();
const UserDao = require('../dao/users-dao');
const dao = new UserDao();

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
router.get('/', (req, res, next) => {
  const response = dao.retrieveAll();
  res.status(200).json(response);
});


/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: Retrieve User Info
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        description: id of a user
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: users
 *        schema:
 *          $ref: '#/definitions/User'
 */
router.get('/:id', function(req, res, next){
  console.log(req.params.id);
  const response = dao.retrieve(Number(req.params.id));
  console.log(response);
  res.send(response);
});

module.exports = router;



