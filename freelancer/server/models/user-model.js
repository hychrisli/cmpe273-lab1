/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    required:
 *      - uid
 *      - username
 *      - password
 *    properties:
 *      uid:
 *        type: number
 *      username:
 *        type: string
 *      password:
 *        type: string
 *  Users:
 *    type: array
 *    items:
 *      $ref: '#/definitions/User'
 */
module.exports = class User {
  constructor(uid, username, password) {
    this.uid = uid;
    this.username = username;
    this.password = password;
  }
};
