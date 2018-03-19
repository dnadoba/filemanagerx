const express = require('express')
const router = express.Router()
const path = require('path')
const files = require('../../api/files')
const urljoin = require('url-join')

router.get('/admin/list*', (req, res, next) => {
  let directoryPath = path.join(__dirname, '../../files', req.params[0])

  files.list(directoryPath, req.params[0], (err, data) => {

    res.locals.urljoin = urljoin

    res.render('files/list', {
      data: data,
      admin: true,
      pagePath: '/admin/list',
    });
  })
})

module.exports = router
