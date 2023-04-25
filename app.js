import weaviate from 'weaviate-client';
import fs from 'fs';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const schemaRes = await client.schema.getter().do();

//-----------------defining schema --------------------

// const schemaConfig = {
//     'class': 'transcript',
//     'vectorizer': 'img2vec-neural',
//     'vectorIndexType': 'hnsw',
//     'moduleConfig': {
//         'img2vec-neural': {
//             'imageFields': [
//                 'image'
//             ]
//         }
//     },
//     'properties': [
//         {
//             'name': 'image',
//             'dataType': ['blob']
//         },
//         {
//             'name': 'text',
//             'dataType': ['string']
//         }
//     ]
// }

// await client.schema
//     .classCreator()
//     .withClass(schemaConfig)
//     .do();


//-------------------adding image to the database-------------------------

// const img = fs.readFileSync('./image/8.png');

// const b64 = Buffer.from(img).toString('base64');

// await client.data.creator()
//   .withClassName('transcript')
//   .withProperties({
//     image: b64,
//     text: 'eight'
//   })
//   .do().then(res=>{
//     console.log(res)
//   }).catch(err =>{
//      console.log(err)
//   });

//----------------------serching for the test images--------------------

const test = Buffer.from( fs.readFileSync('./test2.png') ).toString('base64');

await client.graphql.get()
  .withClassName('Transcript')
  .withFields(['image'])
  .withNearImage({ image: test })
  .withLimit(1)
  .do().then((res=>{
    const result = res.data.Get.Transcript[0].image;
    fs.writeFileSync('./result.png', result, 'base64');
  })).catch(err=>{
    console.log(err)
  });

//Write result to filesystem






//---------------------------------
// client
//     .data
//     .getter()
//     .withClassName('Transcript')
//     .withLimit(2)
//     .do()
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.error(err)
//     });