const router = require("express").Router();
const album = require("../models/album");

// Create
router.post("/create", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });

  try {
    const savedAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: savedAlbum });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//Read One
router.get("/getOne/:id", async (req, res) => {
  // return res.json(req.params.id); //Lấy ra id

  const filter = { _id: req.params.id };

  const data = await album.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, album: data });
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

  const dataAllAlbums = await album.find(options);

  if (dataAllAlbums) {
    return res.status(200).send({ success: true, albums: dataAllAlbums });
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
    const result = await album.findOneAndUpdate(
      filter,
      //Du lieu can cap nhat
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
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

  const result = await album.deleteOne(filter);

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
