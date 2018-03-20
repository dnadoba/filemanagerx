const fs = require('fs')
const express = require('express')
const path = require('path')
const router = express.Router()
const files = require('../../api/files')
const urljoin = require('url-join')
const async = require('async')
const os = require('os')
const multer = require('multer')

const upload = multer({
  dest: path.join(os.tmpdir(), 'uploads')
})

const actions = {
  'delete': deleteFile,
  'upload': uploadFiles,
  'createFolder': createFolder,
}

const defaultAction = actions['upload']

router.post('/admin/list*', upload.any(), (req, res, next) => {

  const actionName = req.body.action
  const action = actions[actionName] || defaultAction

  action(req, res, (error) => {
    if(error) {
      return next(error)
    }
    let directoryPath = path.join(__dirname, '../../files', req.params[0])

    files.list(directoryPath, req.params[0], (err, data) => {
      if (err) {
        return next(err)
      }
      res.locals.urljoin = urljoin

      res.render('files/list', {
        data: data,
        admin: true,
        pagePath: '/admin/list',
      });
    })
  })
})

function deleteFile(req, res, next) {
  let filePath = path.join(path.dirname(require.main.filename), req.body.path)
  fs.unlink(filePath, (error) => {
    if (error) {
      //file does not exists
      if (error.code === "ENOENT") {
        //ignore, it was probably already delete
      } else {
        return next(error)
      }
    }
    //success
    next()
  })
}

function uploadFiles(req, res, next) {
  let destinationPath = path.join(path.dirname(require.main.filename), 'files', req.params[0])

  async.each(req.files, function (file, next) {
    fs.rename(file.path, path.join(destinationPath, file.originalname), next)
  }, next)
}

function createFolder(req, res, next) {
  next(new Error("not implemented"))
}

module.exports = router
