module.exports = (app) => {

    app.put('/admin/tbl/:tblName', async(req, res) => {

        const reqBody = req.body;
        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('xa');
        const tblName = req.params.tblName;
        let qry = reqBody.qry;
        const udt = reqBody.udt;
        if (qry._id.length === 24) qry._id = new req.Mongo.ObjectID(qry._id);

        db
            .collection(tblName)
            .updateOne(qry, udt)
            .then(result1 => {
                if (result1.modifiedCount === 1) {
                    res.json({ status: 1 });
                } else {
                    res.json({ status: 0 });
                }
                client.close();
            })
            .catch(e => {
                res.sendStatus(500);
                client.close();
            });

    });

    return app;

}