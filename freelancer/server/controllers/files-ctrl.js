const express = require('express');
const router = express.Router();
const userDao = require('../dao/users-dao');
const fs = require('fs');
const imageDir = process.env.IMAGE_DIR;
const {promisePutNotice} = require('./ctrls');

/**
 * @swagger
 * /files/image/{username}:
 *  post:
 *    description: upload image for user
 *    tags:
 *       - files
 *    produces:
 *      - multipart/form-data
 *    parameters:
 *      - name: username
 *        description: Username for profile image.
 *        in: path
 *        required: true
 *        type: string
 *      - in: formData
 *        name: image
 *        type: file
 *        description: upload image
 *    responses:
 *      200:
 *        description: upload success
 */
router.post('/image/:username', (req, res) =>{
  const username = req.params.username;
  if ( !req.files )
    return res.status(400).send('No files were uploaded');

  let image = req.files.image;
  let imageName = username + '_' + image.name;
  console.log(image.name);

  image.mv( imageDir + '/' + imageName, (err) => {
    if ( err )
      return res.status(500).send(err);
    promisePutNotice(userDao.update(req.params.username, {image: imageName}), 'Image uploaded!', res, 200);
  })
});

/**
 * @swagger
 * /files/image/{username}:
 *  get:
 *    description: download image for user
 *    tags:
 *       - files
 *    consumes:
 *      - image/png
 *    parameters:
 *      - name: username
 *        description: Username for profile image.
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: download success
 */
router.get('/image/:username', (req, res)=> {
  const username = req.params.username;

  const promise = userDao.retrieve(username);
  promise.then((val)=>{
    if (val.length < 1)
      res.status(400).send("No such user");
    else {
      const imageFile = imageDir + '/' + val[0].image;
      if (fs.existsSync(imageFile))
        res.sendFile(imageFile);
      else
        res.status(400).send("No such file");
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

module.exports = router;