module.exports = (app) => {

    app.post('/nasa/user/register', async(req, res) => {

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

    });

    return app;

}