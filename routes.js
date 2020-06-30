

const requestHandler = (req, res) => {
    const url = req.url;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/HTML');
        res.write(`
       <html lang="en">
               <head>
               <meta charset="UTF-8">
                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title>YT Downloader</title>
       </head>
       <body>        
       </body>
       </html>
       `)
        return res.end()
    }
}

module.exports = requestHandler;