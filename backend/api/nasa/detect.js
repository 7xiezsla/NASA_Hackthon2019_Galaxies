// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";
// import cocoSsd from "@tensorflow-models/coco-ssd";

module.exports = (app) => {

    // app.post('/nasa/detect', async())

    return app;

}

// const hasPerson = async() => {

//     const detectFrame = async(img, model) => {
//         let det_result;
//         await model
//             .detect(img)
//             .then(predictions => {
//                 console.log(predictions);
//                 // det_result = predictions.class === 'person' ? true : false;
//                 for (let i = 0; i < predictions.length; i++) {
//                     if (predictions[i].class === 'person')
//                         det_result = true;
//                     break;
//                 }
//             })
//             .catch(e => {});
//         if (det_result) {
//             return det_result;
//         } else {
//             det_result = false;
//             return det_result;
//         }


//     };

//     let model;

//     await cocoSsd
//         .load()
//         .then(values => {
//             model = values;
//         })
//         .catch(error => {
//             console.error(error);
//         });
//     // console.log(model.detect());

//     let img = document.createElement('img');
//     img.src = 'test4.jpg'

//     const det_result = await detectFrame(img, model);

//     return det_result;

// }

// hasPerson();