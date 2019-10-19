const fetch = require('node-fetch');
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const mongoConnStr = 'mongodb://seal:seal1234@sealchang.asia:27017/admin';
const mongoConnOpt = { useNewUrlParser: true, useUnifiedTopology: true };

const main = async() => {

    const getYYYYMMDDHH = (i) => {

        const datetimeFix = (x) => {

            if (x < 10) x = '0' + x;

            return x;

        };

        let date = new Date();

        const y = String(date.getFullYear());
        const m = datetimeFix(date.getMonth() + 1);
        const d = datetimeFix(date.getDate());
        const H = datetimeFix(date.getHours() - i);

        yyyymmddhh = y + m + d + H;

        return yyyymmddhh;

    }

    let data = null;

    let cityIdArr = ['466940', '466900', '466880', '466930', '466910', '467571', '467490', '467770', '467350', '467650', '467530', '467550', '467480', '467410', '467440', '467590', '467080', '467060', '466990', '467610', '467660', '467540', '467620', '466950', '467300', '469020', '468100', '467420', 'A0W030', 'A0C540', 'D2F230', 'A0T780', 'A0A9M0', '466920', 'A0G720', 'A0Z080', 'A0W080', '467110', '467990', 'A0K420', '467050', 'A2K570', 'A0W100', 'CAAH60'];
    let cityArr = ['基隆', '淡水', '土城', '陽明', '陽明', '新竹', '忠明', '沙鹿', '馬公', '埔里', '竹山', '埔里', '嘉義', '臺南', '小港', '恆春', '宜蘭', '冬山', '花蓮', '關山', '臺東', '潮州', '恆春', '基隆', '馬公', '金門', '金門', '安南', '金門', '土城', '三義', '花蓮', '新店', '萬華', '彰化', '埔里', '馬公', '金門', '馬祖', '麥寮', '觀音', '斗六', '金門', '古亭'];

    // await fetch('https://airtw.epa.gov.tw/json/AQI/Taiwan_' + '2019101910' + '.json')
    await fetch('https://airtw.epa.gov.tw/json/AQI/Taiwan_' + getYYYYMMDDHH(1) + '.json')
        .then(res => res.json())
        .then(res => {

            let newdata = [];

            res.forEach(d => {

                const temp = d.txt.split(' ');

                let idx = cityArr.indexOf(temp[0]);

                while (idx !== -1) {

                    const qry = { _id: cityIdArr[idx] };

                    const udt = {
                        $set: {
                            GIS: temp[1].replace(/\(.*?\)/g, ''),
                            GIS_Level: d.type
                        }
                    }

                    newdata.push({ qry: qry, udt: udt });

                    cityIdArr.splice(idx, 1);
                    cityArr.splice(idx, 1);
                    idx = cityArr.indexOf(temp[0]);

                }

            });

            data = newdata;
        })
        .catch(e => console.log(e));

    console.log(data.length);

    if (data !== null) {

        const client = await MongoClient.connect(mongoConnStr, mongoConnOpt);

        const db = client.db('nasa');
        const weather = db.collection('weather');

        data.forEach(async(d) => {
            await weather
                .updateOne(d.qry, d.udt)
                .then(result1 => {})
                .catch(e => { console.log(d, 'error') });
        })

        client.close();
    }

}

main();

// const vision = require('@google-cloud/vision');

// // Creates a client
// const client = new vision.ImageAnnotatorClient()

// client.keyFilename = './googleAuth.json'

// async function quickstart() {
//     // Creates a client
//     const client = new vision.ImageAnnotatorClient()

//     client.keyFilename = './googleAuth.json'

//     // Performs label detection on the image file
//     const [result] = await client.labelDetection('./3.jpg');
//     const labels = result.labelAnnotations;
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
// }
// quickstart()