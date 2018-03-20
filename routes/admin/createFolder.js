const fs = require('fs')
const path = require('path')

let rootFilesFolderPath = path.join(path.dirname(require.main.filename), '/files')

function createFolder(req, res, next) {
  const currentRelativeFolderPath = req.params[0]
  const folderName = req.body.folderName

  const folderPath = path.join(rootFilesFolderPath, currentRelativeFolderPath, folderName)

  fs.mkdir(folderPath, function(error) {
    if(error) {
      //the folder does already exists
      if(error.code === 'EEXIST') {
        //ignore
      } else {
        return next(error)
      }
    }
    next()
  })
}

module.exports = {
  handler: createFolder,
}
