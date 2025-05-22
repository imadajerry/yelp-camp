const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")

main().catch((err) => console.log(err))

async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => console.log(err))
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0 ; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000) + 1
        const price = Math.floor(Math.random() * 20 ) + 10
        const camp = new Campground ({  
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            price,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis enim aliquam quod aperiam ad aspernatur ex, ab deserunt eveniet cupiditate commodi rem accusantium nemo temporibus nam laudantium, dolor libero doloremque!",
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})