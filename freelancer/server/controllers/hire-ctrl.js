const express = require('express');
const router = express.Router();
const projDao = require('../dao/projs-dao');
const {promisePostResponse} = require('./ctrls');

/**
 * @swagger
 * /hire/{project_id}:
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
 *      - name: chosen_bid
 *        description: bid that is chosen for the project
 *        in: formData
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: project updated
 */

router.put('/:project_id', (req, res) => {
  promisePostResponse(projDao.update(Number(req.params.project_id), req.body), req, res, 200);
});

module.exports = router;