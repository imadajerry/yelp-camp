const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => console.log(err));
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "682ff54d6743a1060f898c6a",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: "https://res.cloudinary.com/dnz5vllzm/image/upload/v1749630861/YelpCamp/dpoxjormx9zwumt8wti8.jpg",
          filename: "YelpCamp/dpoxjormx9zwumt8wti8",
        },
        {
          url: "https://res.cloudinary.com/dnz5vllzm/image/upload/v1749630860/YelpCamp/x3hfxlax9m7sorvzjkyz.jpg",
          filename: "YelpCamp/x3hfxlax9m7sorvzjkyz",
        },
      ],
      price,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis enim aliquam quod aperiam ad aspernatur ex, ab deserunt eveniet cupiditate commodi rem accusantium nemo temporibus nam laudantium, dolor libero doloremque!",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close(); 
});
