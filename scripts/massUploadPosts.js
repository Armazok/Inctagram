const fs = require('fs')

const axios = require('axios')
const FormData = require('form-data')
const { createApi } = require('unsplash-js')

const userId = 6

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

const uploadPhoto = async fileName => {
  console.log(`read: ${fileName}`)
  const file = fs.readFileSync(`./photos/${fileName}`)

  const formData = new FormData()

  formData.append('file', file, fileName)

  console.log(`upload: ${fileName}`)

  return axios.post('https://lionfish-app-3jdhn.ondigitalocean.app/posts/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY4MjM2NzU5MywiZXhwIjoxNjgyNDUzOTkzfQ.BVG8FBmxIcW02AOirJGg9j7-njUPdFQGwCBnkBRWQyw',
      Cookie:
        'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImRldmljZUlkIjo5OCwiaWF0IjoxNjgyMzY3NTkzLCJleHAiOjE2ODIzNjgxOTN9.92pghlrOlU3oT1ktPY-c2h38ccbcxJCI2gDTgfy0xdM',
    },
  })
}

const createPost = async uploadId => {
  console.log('create post')

  const data = {
    description: 'string',
    childrenMetadata: [
      {
        uploadId,
      },
    ],
  }

  return axios.post('https://lionfish-app-3jdhn.ondigitalocean.app/posts/', data, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY4MjM2NzU5MywiZXhwIjoxNjgyNDUzOTkzfQ.BVG8FBmxIcW02AOirJGg9j7-njUPdFQGwCBnkBRWQyw',
      Cookie:
        'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImRldmljZUlkIjo5OCwiaWF0IjoxNjgyMzY3NTkzLCJleHAiOjE2ODIzNjgxOTN9.92pghlrOlU3oT1ktPY-c2h38ccbcxJCI2gDTgfy0xdM',
    },
  })
}

const downloadPhotos = async () => {
  const response = await getCollection()
  const photos = response.response.results

  for (let photo of photos) {
    const url = photo.urls.regular

    await downloadAndSaveImage(url, photo.id)
  }
}

const uploadPhotos = async () => {
  fs.readdir('./photos', async (err, files) => {
    console.log(files)

    for (let i = 0; i < files.length; i++) {
      const responseUploadPhoto = await uploadPhoto(files[i])

      const uploadId = responseUploadPhoto.data.images[0].uploadId

      console.log(`uploadId: ${uploadId}`)

      const responseCreatePost = await createPost(uploadId)
      const postId = responseCreatePost.data.id

      console.log(`post created: ${postId}`)
    }
  })
}

// downloadPhotos().then(() => {
//   uploadPhotos().then(() => console.log('end 3'))
// })

uploadPhotos().then(() => {
  console.log('end upload photos')
})
