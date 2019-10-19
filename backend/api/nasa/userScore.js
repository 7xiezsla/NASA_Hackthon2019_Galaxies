module.exports = (app) => {

    app.put('/nasa/user/score', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.body;
        const qry = { account: req.account };
        const value = +reqBody.value;

        let udt = { $add: { score: Math.abs(value) } };

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

    });

    return app;

}