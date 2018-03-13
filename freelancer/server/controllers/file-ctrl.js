const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /file/image/{username}:
 *  post:
 *    description: upload image for user
 *    tags:
 *       - file
 *    consumes:
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

  image.mv(process.env.IMAGE_DIR + '/' + username + '.jpg', (err) => {
    if ( err )
      return res.status(500).send(err)
    res.send('Image uploaded!')
  })

});

module.exports = router;