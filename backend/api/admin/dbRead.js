module.exports = (app) => {

    app.get('/admin/db', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('xa');

        db
            .listCollections()
            .toArray()
            .then(result1 => {
                let output = result1.map(d => d.name);
                res.json(output);
                client.close();
            })
            .catch(e => {
                res.sendStatus(500);
                client.close();
            })

    });

    return app;

}