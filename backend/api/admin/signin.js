module.exports = (app) => {

    const getDatetime = () => {

        const datetimeFix = (x) => {

            if (x < 10) x = '0' + x;

            return x;

        };

        let date = new Date(new Date().setDate(new Date().getDate()));

        const y = date.getFullYear();
        const m = datetimeFix(date.getMonth() + 1);
        const d = datetimeFix(date.getDate());
        const H = datetimeFix(date.getHours());
        const M = datetimeFix(date.getMinutes());
        const S = datetimeFix(date.getSeconds());

        date = y + '-' + m + '-' + d;
        time = H + ':' + M + ':' + S;

        datetime = date + ' ' + time;

        return datetime;

    };

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

    app.post('/admin/signin', async(req, res) => {

        const reqBody = req.body;
        const un = reqBody.un;
        const client = await req.MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);

        const db = client.db('xa');

        db
            .collection('userAuth')
            .findOne({ _id: un })
            .then(result1 => {
                if (result1 === null) {
                    // 未註冊之電子郵件信箱
                    res.json({ status: 2 });
                    client.close();
                } else {
                    const pwd = pwdEncode(reqBody.uid);
                    if (pwd !== result1.pwd) {
                        // 密碼不正確
                        res.json({ status: 3 });
                        client.close();
                    } else {
                        const sId = idCreator();
                        const dId = idCreator();
                        // let maxAge = Date.now() + 1800000;
                        const maxAge = 9999999999999; // 測試中 50 小時
                        // 登入成功，回傳 token
                        db
                            .collection('session')
                            .insertOne({ _id: sId, dId: dId, maxAge: maxAge, owner: un, datetime: getDatetime() })
                            .then(result2 => {
                                // 登入成功
                                res.cookie('sId', sId);
                                res.cookie('dId', dId);
                                res.json({ status: 1 });
                                client.close();
                            })
                            .catch(e => {
                                res.sendStatus(500);
                                client.close();
                            });

                    }
                }
            });


    });

    return app;

}