const path = require('path')
const files = require('../../api/files')
const urljoin = require('url-join')

function renderFilesList(options, req, res, next) {
  let directoryPath = path.join(__dirname, '../../files', req.params[0])

  files.list(directoryPath, req.params[0], (err, data) => {
    if (err) {
      return next(err)
    }
    res.locals.urljoin = urljoin

    res.render('files/list', {
      data: data,
      isAdmin: options.isAdmin,
      pagePath: options.pagePath,
    });
  })
}
const renderAdminFilesList = renderFilesList.bind(null, {isAdmin: true, pagePath: '/admin/list'})
const renderPublicFilesList = renderFilesList.bind(null, {isAdmin: false, pagePath: '/list'})


module.exports = {
  forAdmin: renderAdminFilesList,
  forPublic: renderPublicFilesList,
}
