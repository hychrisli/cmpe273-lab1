const express = require('express');
const router = express.Router();
const skillDao = require('../dao/skills-dao');
const {promiseGetResponse, promisePostResponse, promiseGetOneResponse} = require('./ctrls');

/**
 * @swagger
 * /skills:
 *  get:
 *    description: Retrieve all skills
 *    tags:
 *       - skills
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: projects
 */
router.get('/', (req, res) => {
  promiseGetResponse(skillDao.retrieveAll(), res, 200);
});


/**
 * @swagger
 * /skills/{skill_id}:
 *  get:
 *    description: Retrieve skill info
 *    tags:
 *       - skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: skill_id
 *        description: skill ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: a project
 */
router.get('/:skill_id', function (req, res, next) {
  const skill_id = req.params.skill_id;
  if ( skill_id !== undefined )
    promiseGetOneResponse(skillDao.retrieve(Number(skill_id)), res, 200);
  else res.status(400).send("Empty Skill ID");
});

/**
 * @swagger
 * /skills:
 *  post:
 *    description: Create a skill
 *    tags:
 *       - skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: skill_name
 *        description: The Name of the skill
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: skill created
 */
router.post('/', (req, res) => {
  promisePostResponse(skillDao.insert(req.body), req, res, 201);
});

module.exports = router;