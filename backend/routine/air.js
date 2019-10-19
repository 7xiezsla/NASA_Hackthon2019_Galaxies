const fetch = require('node-fetch');
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const mongoConnStr = 'mongodb://seal:seal1234@localhost:27017/admin';
const mongoConnOpt = { useNewUrlParser: true, useUnifiedTopology: true };

const main = async() => {

    const getYYYYMMDDHH = () => {

        const datetimeFix = (x) => {

            if (x < 10) x = '0' + x;

            return x;

        };

        let date = new Date();

        const y = String(date.getFullYear());
        const m = datetimeFix(date.getMonth() + 1);
        const d = datetimeFix(date.getDate());
        const H = datetimeFix(date.getHours() - 1);

        yyyymmddhh = y + m + d + H;

        return yyyymmddhh;

    }

    let data;

    // await fetch('https://airtw.epa.gov.tw/json/AQI/Taiwan_' + '2019101910' + '.json')
    await fetch('https://airtw.epa.gov.tw/json/AQI/Taiwan_' + getYYYYMMDDHH() + '.json')
        .then(res => console.log(res.json()))
        .then(res => {
            const newdata = res.cwbopendata.location.map(d => {

                let onedata = {
                    _id: d.stationId,
                    longitude: d.lon,
                    latitude: d.lat,
                    locationName: d.locationName
                }

                const schema = new Set(['WDSD', 'TEMP', 'HUMD', 'PRES', '24R', 'H_FX', 'H_UVI', 'D_TX', 'D_TN', 'H_Weather']);

                d.weatherElement.forEach(k => {
                    if (schema.has(k.elementName)) {
                        onedata[k.elementName] = k.elementValue.value;
                    }
                })

                return onedata;
            });

            data = newdata;
        })
        .catch(e => console.log(e));

    // const client = await MongoClient.connect(req.mongoConnStr, req.mongoConnOpt);

    // const db = client.db('nasa');
    // const weather = db.collection('weather');

    // data.forEach(d => {
    //     await weather
    //         .replaceOne(d)
    //         .then(result1 => {})
    //         .catch(e => {});
    // })

    // client.close();

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