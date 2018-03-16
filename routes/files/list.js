const express = require('express')
const router = express.Router()

router.get('/files/list', (req, res, next) => {
  console.log("test")
  
  res.render('files/list', {
    
  })
})

module.exports = router