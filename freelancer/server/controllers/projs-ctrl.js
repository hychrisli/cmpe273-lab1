const express = require('express');
const router = express.Router();
const projDao = require('../dao/projs-dao');
const {promiseResponse} = require('./ctrls');

/**
 * @swagger
 * /projs:
 *  get:
 *    description: Retrieve all projects
 *    tags:
 *       - projects
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: projects
 */
router.get('/', (req, res) => {
  promiseResponse(projDao.retrieveAll(), res);
});


/**
 * @swagger
 * /projs/{project_id}:
 *  get:
 *    description: Retrieve User Info
 *    tags:
 *       - projects
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: a project
 */
router.get('/:project_id', function (req, res, next) {
  const project_id = req.params.project_id;
  if ( project_id !== undefined )
    promiseResponse(projDao.retrieve(Number(req.params.project_id)), res);
  else res.send({id:0});
});

/**
 * @swagger
 * /projs:
 *  post:
 *    description: Create a new project
 *    tags:
 *       - projects
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: title
 *        description: Title of the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        description: Description of the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: employer
 *        description: Employer's user ID
 *        in: formData
 *        required: true
 *        type: string
 *      - name: min_budget
 *        description: minimum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: max_budget
 *        description: maximum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: start_date
 *        description: The start date of the project
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: project created
 */
router.post('/', (req, res) => {
  console.log(req.body);
  const date =  new Date(req.body.start_date);
  req.body.start_date = date.toISOString().slice(0,10);
  promiseResponse(projDao.insert(req.body), res);
});


/**
 * @swagger
 * /projs/{project_id}:
 *  put:
 *    description: update a project
 *    tags:
 *      - projects
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: number
 *      - name: title
 *        description: Title of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: description
 *        description: Description of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: min_budget
 *        description: minimum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: max_budget
 *        description: maximum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: start_date
 *        description: The start date of the project
 *        in: formData
 *        required: false
 *        type: string
 *    responses:
 *      200:
 *        description: project updated
 */

router.put('/:project_id', (req, res) => {
  console.log(req.params.project_id);
  const date =  new Date(req.body.start_date);
  req.body.start_date = date.toISOString().slice(0,10);
  console.log(req.body);
  promiseResponse(projDao.update(Number(req.params.project_id), req.body), res);
});

module.exports = router;