const express = require('express');
const router = express.Router();
const BidDao = require('../dao/bids-dao');
const {promiseGetResponse, promisePostResponse, promiseGetOneResponse} = require('./ctrls');

/**
 * @swagger
 * /bids:
 *  get:
 *    description: Retrieve all bids
 *    tags:
 *       - bids
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: bids
 */
router.get('/', (req, res) => {
  promiseGetResponse(BidDao.retrieveAll(), res, 200);
});

/**
 * @swagger
 * /bids/{bid_id}:
 *  get:
 *    description: retrieve a bid
 *    tags:
 *       - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: bid_id
 *        description: bid ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: a bid
 */
router.get('/:bid_id', function (req, res, next) {
  const bid_id = req.params.bid_id;
  if ( bid_id !== undefined )
    promiseGetOneResponse(BidDao.retrieveBid(Number(bid_id)), res, 200);
  else
    res.status(400).send("Invalid Bid GET Request");
});

/**
 * @swagger
 * /bids:
 *  post:
 *    description: New bid for a project
 *    tags:
 *       - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        description: user to bid the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: project_id
 *        description: Id of the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: bid_price
 *        description: bid price for the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: bid_days
 *        description: bid days for the project
 *        in: formData
 *        required: false
 *        type: string
 *    responses:
 *      201:
 *        description: bid created
 */
router.post('/', (req, res) => {
  console.log(req.body);
  promisePostResponse(BidDao.insertBid(req.body), req, res, 201);
});

module.exports = router;