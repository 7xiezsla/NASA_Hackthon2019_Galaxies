module.exports = (app, fs) => {

    let dirList = fs.readdirSync('./api/admin/', { withFileTypes: false });
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
            const dId = credentials.dId;

            const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);

            const db = client.db('xa');
            await db
                .collection('session')
                .findOne({ _id: sId, dId: dId })
                .then(async(result1) => {
                    tokenStatus.owner = result1.owner;
                    if (result1 !== null) {
                        const now = Date.now();
                        if (now <= result1.maxAge) {
                            // const maxAge = Date.now() + 180000000; // 測試中 50 小時
                            const maxAge = 9999999999999;
                            await db
                                .collection('session')
                                .updateOne({ _id: sId }, { $set: { maxAge: maxAge } })
                                .then(async(result2) => {
                                    // token 有效並延期
                                    tokenStatus.status = true;
                                    client.close();
                                })
                                .catch(e => { client.close(); });
                        }
                    }
                })
                .catch(e => { client.close(); });
        }

        return tokenStatus;

    }

    app.all('/admin/*', async(req, res, next) => {

        let isAuthenticated = false;
        const Mongo = require('mongodb');
        const MongoClient = Mongo.MongoClient;
        const mongoConnStr = 'mongodb://xnet:23222635@r.xnet.world:27017/admin';
        const mongoConnOpt = { useNewUrlParser: true, useUnifiedTopology: true }; // warning fixs
        req.Mongo = Mongo;
        req.MongoClient = MongoClient;
        req.mongoConnStr = mongoConnStr;
        req.mongoConnOpt = mongoConnOpt;

        if (req.url === '/admin/signin' | req.url === '/admin/signout') {
            next();
        } else {
            const tokenStatus = await checkToken(req);
            isAuthenticated = tokenStatus.status;
            req.owner = tokenStatus.owner;
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