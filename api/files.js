const path = require('path')
const fs = require('fs')
const urljoin = require('url-join')

const imageFileExtensions = ['.jpg', '.png', '.gif', '.jpeg']

function isImage(fileName) {
  let extension = path.extname(fileName).toLowerCase()
  return imageFileExtensions.includes(extension)
}

function list(filesRootDirectory, currentDirectoryPath, callback){
  fs.readdir(filesRootDirectory, (err, fileNames) => {
    if (err) {
      callback(err)
      return
    }

    let files = fileNames.map((fileName) => {
      let pathOnFilesystem = path.join(filesRootDirectory, fileName)
      let isFile = fs.statSync(pathOnFilesystem).isFile()
      return {
        title: fileName,
        relativePath: urljoin(currentDirectoryPath, fileName),
        //FIXME: get stats of files async
        isFile: isFile,
        isImage: isFile && isImage(fileName),
      }
    })

    let directoryNames = currentDirectoryPath
      .split('/')
      .filter((directory) => directory !== '')

    let directories = directoryNames.map((path, index, arr) => {
      return {
        title: path,
        relativePath: "" + arr.slice(0, index + 1).join('/'),
      }
    })

    let rootDirectory = {
      title: 'files',
      relativePath: '/',
    }
    //add the root directory entry in front of all other direcotries
    directories.unshift(rootDirectory);

    callback(null, {
      currentDirectoryPath: currentDirectoryPath,
      directories,
      files,
    })
  })
}

module.exports = {
  list: list,
}
