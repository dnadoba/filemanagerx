const fs = require('fs')
const express = require('express')
const path = require('path')
const router = express.Router()
const files = require('../../api/files')
const urljoin = require('url-join')
const os = require('os')
const multer = require('multer')

const upload = multer({
  dest: path.join(os.tmpdir(), 'uploads')
})

router.post('/admin/list*', upload.any(), (req, res, next) => {
  console.log(req.body)
  console.log(req.body.path)

  if (req.body.method === 'delete') {
      console.log('delete')


      fs.unlinkSync(path.join(path.dirname(require.main.filename), req.body.path))
  } else {
    console.log('upload')
    //Upload
    let destinationPath = path.join(path.dirname(require.main.filename), 'files', req.params[0])

    req.files.forEach((file) => {
      fs.rename(file.path, path.join(destinationPath, file.originalname), (error) => {
        if (error) {
          console.error(error)
        }
      })
    })
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

module.exports = router
