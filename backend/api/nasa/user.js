module.exports = (app) => {

    const pwdEncode = (pwd) => {

        const ascii = (a) => {
            return a.charCodeAt(0);
        };

        let pwdUnitArr = pwd.split('');

        let pwdArr = [];

        pwdUnitArr.forEach(d => {
            pwdArr.push(ascii(d));
        });

        return pwdArr.join('1');

    }

    const register = async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.body;
        reqBody._id = reqBody.account;

        await db
            .collection('user')
            .insertOne(reqBody)
            .then(result1 => {
                res.json({ status: 1 });
            })
            .catch(e => {
                res.sendStatus(500);
            });

        client.close();

    }

    const update = async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.body;
        const qry = { account: req.account };

        const udt = { $set: reqBody }
        await db
            .collection('user')
            .updateOne(qry, udt)
            .then(result1 => {
                res.json({ status: 1 });
            })
            .catch(e => {
                res.sendStatus(500);
            });

        client.close();

    }

    const query = async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.body;
        const qry = { account: req.account };

        await db
            .collection('user')
            .findOne(qry, { projection: { _id: 0, password: 0 } })
            .then(result1 => {
                res.json(result1);
            })
            .catch(e => {
                res.sendStatus(500);
            });

        client.close();

    }

    app.post('/nasa/user', register);
    app.put('/nasa/user', update);
    app.get('/nasa/user', query);

    return app;

}