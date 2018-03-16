const fs = require('fs')
const express = require('express')
const path = require('path')
const router = express.Router()
const files = require('../../api/files')

router.post('/list*', (req, res, next) => {
  let directoryPath = path.join(__dirname, '../../files', req.params[0])

  fs.unlink(path.join(path.dirname(require.main.filename), req.body.path))

  files.list(directoryPath, req.params[0], (err, data) => {

    res.locals.path = path

    res.render('files/list', {
      data: data
    });
  })
})

module.exports = router
