require(`dotenv`).config();

const express = require(`express`);
const app = express();

require(`express-async-errors`);

app.get(`/`, (req, res) =>
  res.status(200).send(`We will build this API, we have the technology!`)
);

const connectDB = require(`./db/connectDB`);

void (async function start() {
  const port = process.env.PORT || 3000;

  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Application is up and running at port ${port}...`);
    });
  } catch (error) {
    console.error(`Application error!`, error);
    process.exit(1);
  }
})();
