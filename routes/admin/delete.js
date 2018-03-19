const fs = require('fs')
const express = require('express')
const path = require('path')
const router = express.Router()
const files = require('../../api/files')
const urljoin = require('url-join')

router.post('/admin/list*', (req, res, next) => {
  let directoryPath = path.join(__dirname, '../../files', req.params[0])
  let filePath = path.join(path.dirname(require.main.filename), req.body.path)
  fs.unlink(filePath, (error) => {
    if(error) {
      //file does not exists
      if (error.code === "ENOENT") {
        //ignore, it was probably already delete
      } else {
        return next(error)
      }
    }

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


})

module.exports = router
