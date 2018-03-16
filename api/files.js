const path = require('path')
const fs = require('fs')

function list(directoryPath, params, callback){
  console.log(params)
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      calllback(err)
      return
    }


    let modifiedFiles = []

    files.forEach((file) => {
      let fileObject = path.join(directoryPath, file);
      modifiedFiles.push({title: file, isFile: fs.statSync(fileObject).isFile()});
    });

    let pathObjects = [
      {
        title: 'frontend',
        path: ''
      }
    ]

    params.split(path.sep).filter((path) => {
      return path !== '';
    }).forEach((path, index, arr) => {
      pathObjects.push({
        title: path,
        path: "" + arr.slice(0, index + 1).join('/')
      });
    });

    callback(null, {
        path: params,
        paths: pathObjects,
        files: modifiedFiles
    });
  })
}

module.exports = {
  list: list,
}
