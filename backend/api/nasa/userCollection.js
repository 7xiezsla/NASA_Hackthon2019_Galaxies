module.exports = (app) => {

    const update = async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.body;
        const qry = { account: req.account };

        // {id: 1}
        let udt = { $push: reqBody };

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

    }

    const query = async(req, res) => {

        const getPipeline = (qry) => {

            const pipeline = [{
                $match: qry
            }, {
                $project: {
                    collection: 1
                }
            }, {
                $unwind: {
                    path: '$collection'
                }
            }, {
                $lookup: {
                    from: 'photo',
                    let: { id: '$photo' },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ['$id', '$$id']
                            }
                        }
                    }, {
                        $project: {
                            _id: 0
                        }
                    }],
                    as: 'temp'
                }
            }, {
                $unwind: {
                    path: '$temp'
                }
            }, {
                $replaceRoot: {
                    newRoot: '$temp'
                }
            }, {
                $sort: {
                    id: 1
                }
            }];

            return pipeline;

        }

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.body;
        const qry = { account: req.account };

        const pipeline = getPipeline(qry);

        await db
            .collection('user')
            .aggregate(pipeline)
            .toArray()
            .then(result1 => {
                res.json(result1);
            })
            .catch(e => {
                res.sendStatus(500);
            });

        client.close();

    }

    app.put('/nasa/user/collection', update);
    app.get('/nasa/user/collection', query);

    return app;

}