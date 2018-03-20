const fs = require('fs')
const path = require('path')

function deleteFile(req, res, next) {
  let filePath = path.join(path.dirname(require.main.filename), req.body.path)
  fs.unlink(filePath, (error) => {
    if (error) {
      //file does not exists
      if (error.code === "ENOENT") {
        //ignore, it was probably already delete
      } else {
        return next(error)
      }
    }
    //success
    next()
  })
}

module.exports = {
  handler: deleteFile,
}
