let http = require('http');
let https = require('https');
let bp = require('body-parser');
let serveStatic = require('serve-static');
let fs = require('fs');
let cors = require('cors');
let express = require('express');
let app = express();
let staticBasePath = './static';
let swaggerUi = require('swagger-ui-express');

app.use(serveStatic(staticBasePath, { index: 'index.html' }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
var swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info: {
        title: 'SBIR智媒推推 API',
        version: '1.0.0',
        description: 'Swagger API 說明文件',
    },
    host: 'node.aiday.org',
    basePath: '/'
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./api/sbir/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/doc/sbir', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app = require('./api/router.js')(app, fs);

const sslOptions = {
    key: fs.readFileSync('/home/seal/ssl/server-key.pem'),
    cert: fs.readFileSync('/home/seal/cert.pem'),
    ca: fs.readFileSync('/home/seal/ssl/server-cert.pem')
};

let httpServer = http.createServer(app);
let httpsServer = https.createServer(sslOptions, app);

httpServer.listen(80);
httpsServer.listen(443);