const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/list*', (req, res, next) => {
  console.log(__dirname)
  
  let directoryPath = path.join(__dirname, '../../files', req.params[0])
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) throw err
    
    let modifiedFiles = []

    files.forEach((file) => {
      let fileObject = path.join(directoryPath, file);
      modifiedFiles.push({title: file, isFile: fs.statSync(fileObject).isFile()});
    });

    let pathObjects = [
      {
        title: 'frontend',
        path: ''
      }
    ]
    
    req.params[0].split(path.sep).filter((path) => {
      return path !== '';
    }).map((path, index, arr) => {
      pathObjects.push({
        title: path,
        path: "" + arr.slice(0, index + 1).join('/')
      });
    });

    res.locals.path = path

    res.render('files/list', {
      data: {
        path: req.params[0],
        paths: pathObjects,
        files: modifiedFiles
      }
    });
  })
})

  module.exports = router