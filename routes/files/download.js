const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const filesPath = path.join(path.dirname(require.main.filename), 'files')

router.get('/files*', function(req, res) {
  let pathToFile = path.join(filesPath, req.params[0].replace("/", path.sep))
  res.download(pathToFile); // Set disposition and send it.
});

module.exports = router