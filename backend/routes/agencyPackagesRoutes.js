const Router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

let AgencyPackages = require("../models/agencyPackageModel");

storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/assets/agencyPackageImages/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single("packageImage");

// Add new agency package

Router.route("/addAgencyPackage").post((req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(400).send("Error uploading file");
    }

    const packageName = req.body.packageName;
    const packageImage = req.file ? req.file.filename : null; // Check if file exists
    const roomId = req.body.roomId;
    const activityId = req.body.activityId || null;
    const transportId = req.body.transportId || null;
    const fullDays = Number(req.body.fullDays);
    const packageDescription = req.body.packageDescription || null;
    const commission = Number(req.body.commission || 0);
    const discount = Number(req.body.discount || 0);
    const price = Number(req.body.price);
    const agencyId = req.body.agencyId;
    const published = req.body.published;

    const newAgencyPackage = new AgencyPackages({
      packageName,
      packageImage,
      roomId,
      activityId,
      transportId,
      fullDays,
      packageDescription,
      commission,
      discount,
      price,
      agencyId,
      published,
    });

    newAgencyPackage
      .save()
      .then(() => {
        res.json("New package added!");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error saving package to database");
      });
  });
});

// get all agency packages from the database

Router.route("/getAllAgencyPackage").get((req, res) => {
  AgencyPackages.find()
    .then((agencyPackages) => {
      res.json({ agencyPackages });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get agency package by id

Router.route("/getAgencyPackageById/:id").get((req, res) => {
  AgencyPackages.findById(req.params.id)
    .then((agencyPackage) => {
      res.json(agencyPackage);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get agency package by agency id
Router.route("/getAgencyPackageByAgencyId/:agencyId").get((req, res) => {
  AgencyPackages.find({ agencyId: req.params.agencyId })
    .then((agencyPackages) => {
      res.json(agencyPackages);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch agency packages" });
    });
});

// update agency package
Router.route("/updateAgencyPackage/:packageId").put(async (req, res) => {
  const packageId = req.params.packageId;

  const {
    packageName,
    packageImage,
    roomId,
    activityId,
    transportId,
    fullDays,
    packageDescription,
    commission,
    discount,
    price,
    agencyId,
    published,
  } = req.body;

  const updatedPackage = {
    packageName,
    packageImage,
    roomId,
    activityId,
    transportId,
    fullDays,
    packageDescription,
    commission,
    discount,
    price,
    agencyId,
    published,
  };

  try {
    const updatePackage = await AgencyPackages.findByIdAndUpdate(packageId, updatedPackage);

    if (updatePackage) {
      res.status(200).json({ message: "Package updated successfully" });
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete agency package by ID

Router.route("/deleteAgencyPackage/:id").delete(async (req, res) => {
  try {
    // Find the package by ID
    const deletedPackage = await AgencyPackages.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Check if the package image exists
    if (deletedPackage.packageImage) {
      // Construct the path to the package image
      const imagePath = `../frontend/src/assets/agencyPackageImages/${deletedPackage.packageImage}`;

      // Check if the file exists
      if (fs.existsSync(imagePath)) {
        // Delete the file from the filesystem
        fs.unlinkSync(imagePath);
        console.log("Package image deleted successfully");
      } else {
        console.log("Package image not found");
      }
    }

    res.json("Package deleted successfully!");
  } catch (err) {
    console.error("Error deleting package:", err);
    res.status(500).json({ error: "Failed to delete package" });
  }
});

// Route to publish a package
Router.route("/publishPackage/:packageId").put(async (req, res) => {
  const packageId = req.params.packageId;

  try {
    const updatedPackage = await AgencyPackages.findByIdAndUpdate(
      packageId,
      { published: true },
      { new: true }
    );

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error publishing package:", error);
    res.status(500).json({ message: "Failed to publish package." });
  }
});

// Route to unpublish a package
Router.route("/unpublishPackage/:packageId").put(async (req, res) => {
  const packageId = req.params.packageId;

  try {
    const updatedPackage = await AgencyPackages.findByIdAndUpdate(
      packageId,
      { published: false },
      { new: true }
    );

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error unpublishing package:", error);
    res.status(500).json({ message: "Failed to unpublish package." });
  }
});

module.exports = Router;
