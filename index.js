const { createServer } = require('http')
const http = require('http')
const url = require('url')
const fs = require('fs')

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const dataObject = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is OVERVIEW')
    } else if (pathName === '/product') {
        res.end('This is PRODUCT')
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        })

        res.end('<h1>Page not found</h1>')
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log("Listening for requests on port 3000")
})