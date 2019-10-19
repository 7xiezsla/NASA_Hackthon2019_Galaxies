module.exports = (app) => {

    app.get('/nasa/user/rank', async(req, res) => {

        const getPipeline = (qry) => {

            const pipeline = [{
                $match: qry
            }, {
                $project: {
                    relation: 1
                }
            }, {
                $unwind: {
                    path: '$relation'
                }
            }, {
                $lookup: {
                    from: 'user',
                    let: { account: '$relation' },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ['$account', '$$account']
                            }
                        }
                    }, {
                        $project: {
                            _id: 0,
                            account: 1,
                            name: 1,
                            score: 1
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
                    score: -1
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

    });

    return app;

}