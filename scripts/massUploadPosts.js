const fs = require('fs')

const axios = require('axios')
const FormData = require('form-data')
const { random, shuffle, take } = require('lodash')
const { createApi } = require('unsplash-js')

const unsplash = createApi({
  accessKey: 'tYGvV_aC41dAOtc-dWn-axAe9uY__AOSe4H6UAU4Va0',
})

const getCollection = () => {
  return unsplash.collections.getPhotos({
    collectionId: '1640222',
    perPage: 30,
    page: 7,
  })
}

const downloadAndSaveImage = async (url, id) => {
  console.log(`download: ${id}`)

  const response = await axios.get(url, { responseType: 'stream' })

  const path = `./photos/${id}.jpg`
  const writer = fs.createWriteStream(path)

  response.data.pipe(writer)

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve)
  })

  console.log(`save: ${id}`)
}

const createPost = async files => {
  const formData = new FormData()

  for (let i = 0; i < files.length; i++) {
    const file = fs.readFileSync(`./photos/${files[i]}`)

    formData.append('files', file, files[i])
  }

  return axios.post('https://urchin-app-debt4.ondigitalocean.app/posts', formData, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY4MzY2NTIzOCwiZXhwIjoxNjgzNjY2MDE4fQ.bKi6QziEEioLfgkrkeS64e6rwcXQJB6eqhroE_XOoOc',
    },
  })
}

const uploadPhotos = async () => {
  fs.readdir('./photos', async (err, files) => {
    for (let i = 0; i < 50; i++) {
      const randomFiles = take(shuffle(files), random(3, 10))

      try {
        const response = await createPost(randomFiles)

        console.log(`post created: ${response.data.id}. photos: ${response.data.images.length}`)
      } catch (e) {
        console.log('err', e.message)
      }
    }
  })
}

// downloadPhotos().then(() => {
//   uploadPhotos().then(() => console.log('end 3'))
// })

uploadPhotos().then(() => {
  console.log('end upload photos')
})
