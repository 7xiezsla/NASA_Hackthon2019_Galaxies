let http = require('http');
let bp = require('body-parser');
let serveStatic = require('serve-static');
let fs = require('fs');
let cors = require('cors');
let express = require('express');
let app = express();
let staticBasePath = '../frontend';
let swaggerUi = require('swagger-ui-express');

app.use(serveStatic(staticBasePath, { index: 'index.html' }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
// var swaggerJSDoc = require('swagger-jsdoc');

// var swaggerDefinition = {
//     info: {
//         title: 'SBIR智媒推推 API',
//         version: '1.0.0',
//         description: 'Swagger API 說明文件',
//     },
//     host: '192.168.50.103',
//     basePath: '/'
// };

// options for the swagger docs
// var options = {
//     // import swaggerDefinitions
//     swaggerDefinition: swaggerDefinition,
//     // path to the API docs
//     apis: ['./api/sbir/*.js']
// };

// initialize swagger-jsdoc
// var swaggerSpec = swaggerJSDoc(options);

// app.get('/swagger.json', function(req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
// });

// app.use('/doc/sbir', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app = require('./api/router.js')(app, fs);

let httpServer = http.createServer(app);

httpServer.listen(80);