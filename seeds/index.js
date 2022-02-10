const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '61f2e6a7cd623a4ff469850e',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:'https://res.cloudinary.com/dqiqiiy5k/image/upload/v1643844263/YelpCamp/xyijxydoog2nzrtb5zou.jpg',
          filename: 'YelpCamp/xyijxydoog2nzrtb5zou',
        },  
        {
          url:
            'https://res.cloudinary.com/dqiqiiy5k/image/upload/v1643716588/YelpCamp/spv96oq4gdufzlplcawy.jpg',
          filename: 'YelpCamp/spv96oq4gdufzlplcawy',
        },
        {
          url:
            'https://res.cloudinary.com/dqiqiiy5k/image/upload/v1643716589/YelpCamp/os8eox6xkbj9ohcph51n.jpg',
          filename: 'YelpCamp/os8eox6xkbj9ohcph51n',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      geometry:{
        type: 'Point',
        coordinates:[cities[random1000].longitude, cities[random1000].latitude]
      }
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
