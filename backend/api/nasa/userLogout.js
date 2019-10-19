module.exports = (app) => {

    app.post('/nasa/user/logout', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');

        await db
            .collection('session')
            .deleteOne({ sId: req.sId })
            .then(result1 => {
                res.json({ status: 1 });
            })
            .catch(e => {
                res.sendStatus(500)
            });

        client.close();

    });

    return app;

}