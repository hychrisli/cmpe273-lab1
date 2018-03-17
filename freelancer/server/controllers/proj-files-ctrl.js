const express = require('express');
const router = express.Router();
const projFileDao = require('../dao/proj-files-dao');
const fs = require('fs');
const fileDir = process.cwd() + process.env.FILE_DIR;
const {promisePostNotice} = require('./ctrls');



/**
 * @swagger
 * /proj-files/{project_id}:
 *  post:
 *    description: upload a file for a project
 *    tags:
 *       - proj-files
 *    produces:
 *      - multipart/form-data
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: number
 *      - in: formData
 *        name: file
 *        type: file
 *        description: upload file
 *    responses:
 *      200:
 *        description: upload success
 */
router.post('/:project_id', (req, res) =>{
  const project_id = req.params.project_id;
  if ( !req.files )
    return res.status(400).send('No files were uploaded');

  const fileObj = req.files.file;
  const fileName = project_id + '_' + fileObj.name;
  const file = fileDir + '/' + fileName;

  if (fs.existsSync(file)) {
    fileObj.mv(file, err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send("Upload Success");
    });
  }
  else {
    fileObj.mv(file, (err) => {
      if ( err ){
        console.log(err);
        return res.status(500).send(err);
      }
      promisePostNotice(projFileDao.insert({project_id, file: fileName}), "Upload Success", res, 201);
    })
  }
});


/**
 * @swagger
 * /proj-files/{file_id}:
 *  get:
 *    description: download a file for user
 *    tags:
 *      - proj-files
 *    consumes:
 *      - application/pdf
 *    parameters:
 *      - name: file_id
 *        description: file ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: download success
 *        schema:
 *          type: file
 */
router.get('/:file_id', (req, res)=> {
  const file_id = req.params.file_id;

  const promise = projFileDao.retrieve({id: file_id});
  promise.then((val)=>{
    if (val.length < 1)
      res.status(400).send("No such file");
    else {
      const file = fileDir + '/' + val[0].file;
      if (fs.existsSync(file)) {
        res.set('content-disposition', 'attachment;filename=' + val[0].file);
        res.download(file, val[0].file);
      }
      else
        res.status(400).send("No such file");
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

module.exports = router;
