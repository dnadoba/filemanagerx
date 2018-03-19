const fs = require('fs')
const express = require('express')
const path = require('path')
const router = express.Router()
const files = require('../../api/files')
const urljoin = require('url-join')

router.post('/admin/list*', (req, res, next) => {
  let directoryPath = path.join(__dirname, '../../files', req.params[0])

  fs.unlinkSync(path.join(path.dirname(require.main.filename), req.body.path))

  files.list(directoryPath, req.params[0], (err, data) => {
    if(err) {
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
