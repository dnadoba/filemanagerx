const path = require('path')
const os = require('os')
const fs = require('fs')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({
  dest: path.join(os.tmpdir(), 'uploads')
})
const destinationPath = path.join(path.dirname(require.main.filename), 'files')

if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath)
}

router.get('/upload', (req, res, next) => {
  res.render("uploads")
})

router.post('/upload', upload.any(), (req, res, next) => {
  req.files.forEach((file) => {
    fs.rename(file.path, path.join(destinationPath, file.originalname), (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
  console.log(req.files)

  res.render("uploads")
})

module.exports = router