require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const DB = process.env.DB_STRING;
const PORT = process.env.PORT;
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));

//Doc du lieu dang json khi them vao trong postman
app.use(express.json());

app.get("/", (req, res) => {
  res.json("This is CORS-enabled for all origins!!!!! - Server start");
});

//User authentication route
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

//Artist routes
const artistsRoute = require("./routes/artists");
app.use("/api/artists", artistsRoute);

//Albums routes
const albumsRoute = require("./routes/albums");
app.use("/api/albums", albumsRoute);

//Songs routes
const songsRoute = require("./routes/songs");
app.use("/api/songs", songsRoute);

//Connect database
mongoose.connect(DB, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => {
    console.log("Database connect successfully!");
  })
  .on("error", (err) => {
    console.log(`Error: ${err}`);
  });

//Port 4000 working
app.listen(PORT || 4000, () => {
  console.log("Port 4000 is working");
});
