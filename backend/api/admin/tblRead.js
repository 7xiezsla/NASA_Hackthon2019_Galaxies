module.exports = (app) => {

    app.get('/admin/tbl/:tblName', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('xa');
        const tblName = req.params.tblName;

        db
            .collection(tblName)
            .find()
            .toArray()
            .then(result1 => {
                res.json(result1);
                client.close();
            })
            .catch(e => {
                res.sendStatus(500);
                client.close();
            });

    });

    return app;

}