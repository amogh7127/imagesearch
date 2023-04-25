 import client from './app'
 //docker-compose up -d 

const schemaConfig = {
    'class': 'Meme',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob']
        },
        {
            'name': 'text',
            'dataType': ['string']
        }
    ]
}

await client.schema
    .classCreator()
    .withClass(schemaConfig)
    .do();

// const img = readFileSync('./img/hi-mom.jpg');

// const b64 = Buffer.from(img).toString('base64');

// await client.data.creator()
//   .withClassName('Meme')
//   .withProperties({
//     image: b64,
//     text: 'matrix meme'
//   })
//   .do();

const imageFiles=readdirSync('./images')
const promises = imageFiles.map(async(imageFile) =>{
    const B64=toBase64(`./images/${imageFile}`)
    await client.data.creator().withClassName('transcript').withProperties({
    image: B64,
    text: imageFile.split('.')[0].split('-').join(' ')
  })
  .do()
})
await Promise.all(promises)



// const test = Buffer.from( readFileSync('./test.png') ).toString('base64');

// const resImage = await client.graphql.get()
//   .withClassName('Meme')
//   .withFields(['image'])
//   .withNearImage({ image: test })
//   .withLimit(1)
//   .do();

// // Write result to filesystem
// const result = resImage.data.Get.Meme[0].image;
// writeFileSync('./result.png', result, 'base64');