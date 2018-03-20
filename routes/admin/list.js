const express = require('express')
const path = require('path')
const router = express.Router()
const renderList = require('../files/renderList')
const upload = require('./upload')

const actions = {
  'delete': require('./delete').handler,
  'upload': upload.handler,
  'createFolder': require('./createFolder').handler,
}
const defaultAction = actions['upload']

router.get('/admin/list*', renderList.forAdmin)

router.post('/admin/list*', upload.middleware, (req, res, next) => {

  const actionName = req.body.action
  const action = actions[actionName] || defaultAction

  action(req, res, (error) => {
    if(error) {
      return next(error)
    }
    renderList.forAdmin(req, res, next)
  })
})

module.exports = router
