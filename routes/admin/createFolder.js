

function createFolder(req, res, next) {
  const currentRelativeFolderPath = req.params[0]
  const folderName = req.body.folderName
  next(new Error("createFolder not yet implemented"))
}

module.exports = {
  handler: createFolder,
}
