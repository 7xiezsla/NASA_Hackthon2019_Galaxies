module.exports = (app, fs) => {

    let dirList = fs.readdirSync('./api/nasa/', { withFileTypes: false });
    let routeList = [];

    dirList.forEach(d => {
        if (d !== 'router.js') routeList.push(d);
    });

    const checkToken = async(req) => {

        let tokenStatus = { status: false };

        if (req.headers.cookie != undefined) {

            let credentials = {};
            req.headers.cookie.split('; ').forEach(kev => {
                const kav = kev.split('=');
                credentials[kav[0]] = kav[1];
            })

            const sId = credentials.sId;

            const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);

            const db = client.db('xa');
            await db
                .collection('session')
                .findOne({ _id: sId, dId: dId })
                .then(async(result1) => {
                    tokenStatus.account = result1.account;
                    tokenStatus.sId = result1.sId;
                    if (result1 !== null) {
                        tokenStatus.status = true;
                        client.close();
                    }
                })
                .catch(e => { client.close(); });

        }

        return tokenStatus;

    }

    app.all('/nasa/*', async(req, res, next) => {

        let isAuthenticated = false;
        const Mongo = require('mongodb');
        const MongoClient = Mongo.MongoClient;
        const mongoConnStr = 'mongodb://xnet:23222635@r.xnet.world:27017/admin';
        const mongoConnOpt = { useNewUrlParser: true, useUnifiedTopology: true }; // warning fixs
        const User = require('./src/user');
        const Landmark = require('./src/landmark');
        const Coordinate = require('./src/coordinate');
        req.Mongo = Mongo;
        req.MongoClient = MongoClient;
        req.mongoConnStr = mongoConnStr;
        req.mongoConnOpt = mongoConnOpt;
        req.Utils = {
            User: User,
            Landmark: Landmark,
            Coordinate: Coordinate
        }

        if (req.url === '/user/login' | req.url === '/user/register') {
            next();
        } else {
            const tokenStatus = await checkToken(req);
            isAuthenticated = tokenStatus.status;
            req.owner = tokenStatus.owner;
            req.sId = tokenStatus.sId;
            if (isAuthenticated) {
                next();
            } else {
                res.sendStatus(401);
            }
        }

    })

    routeList.forEach(route => {
        app = require('./' + route)(app);
    });

    return app;

}