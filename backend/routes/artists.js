const router = require("express").Router();
const artist = require("../models/artist");

// Create
router.post("/create", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
  });

  try {
    const savedArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//Read One
router.get("/getOne/:id", async (req, res) => {
  // return res.json(req.params.id); //Lấy ra id

  const filter = { _id: req.params.id };

  const data = await artist.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

//Read All
router.get("/getAll", async (req, res) => {
  const options = {
    //sort la key cua mongoose
    sort: { createAt: 1 }, //createAt:1 (sap xep theo du lieu duoc them vao dau tien)
  };

  const dataAllArtists = await artist.find(options);

  if (dataAllArtists) {
    return res.status(200).send({ success: true, artists: dataAllArtists });
  } else {
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

//Update
router.put("/update/:id", async (req, res) => {
  //Tim _id
  const filter = { _id: req.params.id };

  const options = { upsert: true, new: true };

  try {
    const result = await artist.findOneAndUpdate(
      filter,
      //Du lieu can cap nhat
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
      },
      options
    );

    return res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//Delete
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await artist.deleteOne(filter);

  if (result) {
    return res.status(200).send({
      success: true,
      msg: "data deleted successfully",
      data: result,
    });
  } else {
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

module.exports = router;
