const router = require("express").Router();
const Hotel_Package = require("../models/Hotel_Package");
const multer = require('multer');
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/src/assets/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage
});
// Insert a new package with file upload
router.route("/add").post(upload.single('package_img'), (req, res) => {
  const { package_name, room_id, SActivity_id, spa_id, package_des, price } = req.body;
  //const package_img = req.file ? req.file.path : ''; // Get the path of uploaded image

  const package_img = req.file.filename
  const newPackage = new Hotel_Package({
    package_name,
    room_id,
    SActivity_id,
    spa_id,
    package_des,
    price,
    package_img,
  });

  newPackage
    .save()
    .then(() => {
      res.json("Package Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to add package" });
    });
});

// Read all packages
router.route("/").get((req, res) => {
  Hotel_Package.find()
    .then((hotel_packages) => {
      res.json(hotel_packages);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch packages" });
    });
});

// Update a package by ID
router.route("/update/:id").put(async (req, res) => {
  const packageId = req.params.id;
  const { package_name, room_id, SActivity_id, spa_id, package_des, price } = req.body;
  const package_img = req.file ? req.file.path : ''; // Get the path of uploaded image

  const updatePackage = {
    package_name,
    room_id,
    SActivity_id,
    spa_id,
    package_des,
    price,
    package_img,
  };

  await Hotel_Package.findByIdAndUpdate(packageId, updatePackage)
    .then(() => {
      res.status(200).send({ status: "Package updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message || "Failed to add package" });
    });
});

// Delete a package by ID
router.route("/delete/:id").delete(async (req, res) => {
  const packageId = req.params.id;

  await Hotel_Package.findByIdAndDelete(packageId)
    .then(() => {
      res.status(200).send({ status: "Package deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Failed to delete package" });
    });
});

// Get a specific package by ID
router.route("/get/:id").get(async (req, res) => {
  const packageId = req.params.id;

  await Hotel_Package.findById(packageId)
    .then((package) => {
      res.status(200).send({ status: "Package fetched", package });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Failed to fetch package" });
    });
});

module.exports = router;
