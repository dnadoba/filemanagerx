const path = require('path')
const os = require('os')
const fs = require('fs')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({
  dest: path.join(os.tmpdir(), 'uploads')
})
const async = require('async')
const destinationPath = path.join(path.dirname(require.main.filename), 'files')

// create `files` folder
if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath)
}

function uploadFiles(req, res, next) {
  let destinationPath = path.join(path.dirname(require.main.filename), 'files', req.params[0])

  async.each(req.files, function (file, next) {
    fs.rename(file.path, path.join(destinationPath, file.originalname), next)
  }, next)
}

module.exports = {
  middleware: upload.any(),
  handler: uploadFiles,
}
