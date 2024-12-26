const { createServer } = require('http')
const http = require('http')
const fs = require('fs')

const replaceTemplate = (temp, prodcut) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, prodcut.productName)
    output = output.replace(/{%IMAGE%}/g, prodcut.image)
    output = output.replace(/{%PRICE%}/g, prodcut.price)
    output = output.replace(/{%FROM%}/g, prodcut.from)
    output = output.replace(/{%NUTRIENTS%}/g, prodcut.nutrients)
    output = output.replace(/{%QUANTITY%}/g, prodcut.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, prodcut.description)
    output = output.replace(/{%ID%}/g, prodcut.id)

    if (!prodcut.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    else output = output.replace(/{%NOT_ORGANIC%}/g, '')

    return output
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url

    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml)

        res.end(output)
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