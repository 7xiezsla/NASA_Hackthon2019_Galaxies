module.exports = (app) => {

    app.get('/nasa/landmark', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.query;
        const range = 0.1;
        const longitude = reqBody.longitude;
        const latitude = reqBody.latitude;
        const qry = {
            longitude: { $gte: longitude - 0.1, $lte: longitude + 0.1 },
            latitude: { $gte: latitude - 0.1, $lte: latitude + 0.1 }
        };

        const pipeline = getPipeline(qry);

        await db
            .collection('landmark')
            .find(qry, { projection: { _id: 0 } })
            .toArray()
            .then(result1 => {
                res.json(result1);
            })
            .catch(e => {
                res.sendStatus(500);
            });

        client.close();

    });

    return app;

}