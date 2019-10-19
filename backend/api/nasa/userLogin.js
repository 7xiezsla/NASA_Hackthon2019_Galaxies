module.exports = (app) => {

    const pwdEncode = (pwd) => {

        const ascii = (a) => {
            return a.charCodeAt(0);
        };

        let pwdUnitArr = pwd.split('');

        let pwdArr = [];

        pwdUnitArr.forEach(d => {
            pwdArr.push(ascii(d));
        });

        return pwdArr.join('1');

    }

    const idCreator = () => {

        randomCharArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        const getRandomChar = (randomCharArr) => {

            randomChar = randomCharArr[Math.floor(Math.random() * randomCharArr.length)];

            return randomChar;

        };

        let randomId = '';

        for (i = 0; i < 20; i++) {
            randomId += getRandomChar(randomCharArr);
        }

        return randomId;

    }

    app.post('/nasa/user/login', async(req, res) => {

        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);
        const db = client.db('nasa');
        let qry = req.body;
        qry.password = pwdEncode(qry.password);

        let isValid = false;

        const sId = idCreator();

        await db
            .collection('user')
            .findOne(qry, { projection: { _id: 0, password: 0 } })
            .then(result1 => {
                isValid = true;
                res.cookie('sId', sId, { domain: '.sealchang.asia' });
                res.json(result1);
            })
            .catch(e => {
                res.sendStatus(500);
            });

        if (isValid) {
            await db
                .collection('session')
                .insertOne({ sId: sId, account: qry.account })
                .then(result1 => {})
                .catch(e => {});
        }

        client.close();

    });

    return app;

}