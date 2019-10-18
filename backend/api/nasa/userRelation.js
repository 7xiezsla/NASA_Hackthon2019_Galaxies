module.exports = (app) => {

    app.post('/nasa/user/relation', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('xa');

        await db
            .collection('session')
            .deleteOne({ sId: sId })
            .then(result1 => {})
            .catch(e => {});

        res.end();

    });

    return app;

}