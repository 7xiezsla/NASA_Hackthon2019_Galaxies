module.exports = (app) => {

    app.get('/nasa/global', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.query;
        const range = 0.1;
        const longitude = reqBody.longitude;
        const latitude = reqBody.latitude;

        const pipeline = getPipeline(longitude, latitude);

        await db
            .collection('weather')
            .find({}, { projection: { _id: 0 } })
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