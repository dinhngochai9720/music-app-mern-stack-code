const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user");

router.get("/login", async (req, res) => {
  //   return res.json("Login with Google");
  //   return res.send(req.headers.authorization); //Ma token cua user

  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid token" });
  }

  const token = req.headers.authorization.split(" ")[1]; //Lay ma token (Lấy sau khoảng trắng đầu tiên)
  //   return res.send(token);

  try {
    const decodeValue = await admin.auth().verifyIdToken(token); //(quyen cua admin) - decode token cua user dang nhap de lay thong tin cua user

    if (!decodeValue) {
      return res.status(505).json({ message: "Un Authorized" });
    } else {
      // return res.send(decodeValue); //Thong tin nguoi dung khi decode token

      // Checking user exists or not
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        newUserData(decodeValue, req, res);
      } else {
        updateNewUserData(decodeValue, req, res);
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});

const newUserData = async (decodeValue, req, res) => {
  //Tao user (lay thong tin user tu dang nhap bang Google) - Luu du lieu vao database
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageUrl: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "Admin",
    auth_time: decodeValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

//Update user
const updateNewUserData = async (decodeValue, req, res) => {
  //Tim user_id
  const filter = { user_id: decodeValue.user_id };

  const options = { upsert: true, new: true };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      {
        auth_time: decodeValue.auth_time,
      },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

//Read All
router.get("/getAll", async (req, res) => {
  const options = {
    //sort la key cua mongoose
    sort: { createAt: 1 }, //createAt:1 (sap xep theo du lieu duoc them vao dau tien)
  };

  const dataAllUsers = await user.find(options);

  // if (cursor) {
  //   res.status(200).send({ success: true, data: cursor });

  if (dataAllUsers) {
    res.status(200).send({ success: true, users: dataAllUsers });
  } else {
    res.status(400).send({ success: false, message: "data not found" });
  }
});

// Update Role
router.put("/updateRole/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const role = req.body.data.role;

  // const options = { upsert: true, new: true };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      {
        //Du lieu can cap nhat
        role: role,
      }
      // options
    );

    res.status(200).send({ success: true, user: result });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

//Delete User (Khong  delete duoc user co quyen admin cao nhat)
router.put("/deleteUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const result = await user.deleteOne(filter);

  if (result.deletedCount === 1) {
    return res.status(200).send({
      success: true,
      msg: "User deleted successfully",
    });
  } else {
    return res.status(500).send({ success: false, msg: "User not found" });
  }
});

module.exports = router;
