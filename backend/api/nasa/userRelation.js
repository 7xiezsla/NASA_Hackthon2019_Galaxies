module.exports = (app) => {

    app.put('/nasa/user/relation/:behavior', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const behavior = req.params.behavior;
        const reqBody = req.body;
        const qry = { account: req.account };

        switch (behavior) {
            case 'add':
                const udt = { $push: reqBody };
                await db
                    .collection('user')
                    .updateOne(qry, udt)
                    .then(result1 => {
                        res.json({ status: 1 });
                    })
                    .catch(e => {
                        res.sendStatus(500);
                    });
                break;
            case 'remove':
                const udt = { $pull: reqBody }
                await db
                    .collection('user')
                    .updateOne(qry, udt)
                    .then(result1 => {
                        res.json({ status: 1 });
                    })
                    .catch(e => {
                        res.sendStatus(500);
                    });
                break;
        }

        client.close();

    });

    return app;

}