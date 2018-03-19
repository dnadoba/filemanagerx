const path = require('path')
const fs = require('fs')
const urljoin = require('url-join')
const async = require('async')

const imageFileExtensions = ['.jpg', '.png', '.gif', '.jpeg']

function isImage(filename) {
  let extension = path.extname(filename).toLowerCase()
  return imageFileExtensions.includes(extension)
}

function list(filesRootDirectory, currentDirectoryPath, callback){
  fs.readdir(filesRootDirectory, (err, filenames) => {
    if (err) {
      return callback(err)
    }

    async.map(filenames, (filename, callback) => {
      fs.stat(path.join(filesRootDirectory, filename), (error, stats) => {
        if(error) return callback(error);
        callback(null, {
          filename,
          stats,
        })
      })
    }, (error, filenamesWithStats) => {
      if (error) {
        return callback(error)
      }
      let files = filenamesWithStats.map(({filename, stats}) => {
        let pathOnFilesystem = path.join(filesRootDirectory, filename)
        let isFile = stats.isFile();
        return {
          title: filename,
          relativePath: urljoin(currentDirectoryPath, filename),
          isFile: isFile,
          isImage: isFile && isImage(filename),
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
        currentDirectoryPath,
        directories,
        files,
      })
    })
  })
}

module.exports = {
  list: list,
}
