const app = require('./app')
const port = 5000
const http = require('http')

const server = http.createServer(app).listen(port)

console.log(`Worker ${process.pid} started`)

server.on('error', error => {
  console.error(error)
  process.exit(1)
})

server.on('listening', () => {
  console.log(`Listening on ${server.address().port}`)
})

process.on('SIGINT', () => {
  process.exit(0)
})
