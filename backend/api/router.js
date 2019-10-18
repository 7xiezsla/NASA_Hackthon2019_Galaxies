module.exports = (app, fs) => {

    let dirList = fs.readdirSync('./api/', { withFileTypes: false });

    let routeList = [];

    dirList.forEach(d => {
        if (d !== 'router.js') routeList.push(d);
    });

    routeList.forEach(route => {
        let requirePath = './' + route + '/router.js';
        app = require(requirePath)(app, fs);
    });

    return app;

}