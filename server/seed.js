require("dotenv").config();

const { faker } = require("@faker-js/faker");
const User = require("./models/User");
const Post = require("./models/Post");

// Connect to database
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGOPASS;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected");
}

async function generateUsers(count) {
  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();
    const user = new User({
      name,
      email: faker.internet.email({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      }),
      password: faker.internet.password(),
      age:
        2024 -
        faker.date.birthdate({ min: 18, max: 65, mode: "age" }).getFullYear(),
      gender: faker.person.sex(),
      bio: faker.person.bio(),
      picture: faker.internet.avatar(),
    });

    const post = new Post({
      author: user._id,
      message: faker.lorem.paragraph(),
      title: faker.lorem.words(),
    });
    console.log(user);
    // await user.save();
    // await post.save();
  }
}
generateUsers(1)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
