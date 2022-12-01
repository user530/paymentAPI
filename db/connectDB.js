const mongoose = require(`mongoose`);

const connectDB = async (URI) => {
  console.log(`Initiating DB connection...`);

  return mongoose
    .connect(URI)
    .then((val) => console.log(`DB connection established successfully.`))
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = connectDB;
