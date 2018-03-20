const express = require('express')
const path = require('path')
const router = express.Router()
const files = require('../../api/files')
const urljoin = require('url-join')
const upload = require('./upload')

const actions = {
  'delete': require('./delete').handler,
  'upload': upload.handler,
  'createFolder': require('./createFolder').handler,
}

const defaultAction = actions['upload']
router.get('/admin/list*', renderFilesList)
router.post('/admin/list*', upload.middleware, (req, res, next) => {

  const actionName = req.body.action
  const action = actions[actionName] || defaultAction

  action(req, res, (error) => {
    if(error) {
      return next(error)
    }
    renderFilesList(req, res, next)
  })
})

function renderFilesList(req, res, next) {
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
}

module.exports = router
