module.exports = (app) => {

    app.post('/nasa/user/logout', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('xa');

        await db
            .collection('session')
            .deleteOne({ sId: req.sId })
            .then(result1 => {})
            .catch(e => {});

        res.end();

    });

    return app;

}