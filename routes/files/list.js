const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const files = require('../../api/files')

router.get('/list*', (req, res, next) => {
  console.log(__dirname)

  let directoryPath = path.join(__dirname, '../../files', req.params[0])

  files.list(directoryPath, req.params[0], (err, data) => {

    res.locals.path = path

    res.render('files/list', {
      data: data
    });
  })
})

  module.exports = router
