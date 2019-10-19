module.exports = (app) => {

    app.get('/nasa/environment', async(req, res) => {

        const getPipeline = (longitude, latitude) => {

            const pipeline = [{
                $addField: {
                    deltaX: {
                        $add: ['$longitude', -longitude]
                    },
                    deltaY: {
                        $add: ['$latitude', -latitude]
                    }
                }
            }, {
                $addField: {
                    distance: {
                        $add: [
                            { '$multiply': ['$deltaX', '$deltaX'] },
                            { '$multiply': ['$deltaY', '$deltaY'] }
                        ]
                    }
                }
            }, {
                $sort: {
                    distance: -1
                }
            }, {
                $limit: 1
            }, {
                $project: {
                    _id: 0,
                    distance: 0,
                    longitude: 0,
                    latitude: 0,
                    deltaX: 0,
                    deltaY: 0
                }
            }];

        }

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        const reqBody = req.query;
        const range = 0.1;
        const longitude = reqBody.longitude;
        const latitude = reqBody.latitude;

        const pipeline = getPipeline(longitude, latitude);

        await db
            .collection('weather')
            .aggregate(pipeline)
            .toArray()
            .then(result1 => {
                res.json(result1[0]);
            })
            .catch(e => {
                res.sendStatus(500);
            });

        client.close();

    });

    return app;

}