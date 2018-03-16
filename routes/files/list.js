const express = require('express')
const router = express.Router()
const path = require('path')
const urljoin = require('url-join')
const files = require('../../api/files')

router.get('/list*', (req, res, next) => {
  let directoryPath = path.join(__dirname, '../../files', req.params[0])

  files.list(directoryPath, req.params[0], (err, data) => {

    res.locals.urljoin = urljoin

    res.render('files/list', {
      data: data
    });
  })
})

module.exports = router