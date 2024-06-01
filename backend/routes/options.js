const router = require("express").Router();
const Option = require("../models/Option");
const multer = require("multer");
const path = require("path");



// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images"); // Ensure this directory exists or multer will throw an error
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });



// Add an Option with image
router.route("/addOption").post(upload.single("file"), async (req, res) => {
  const { optionCategory, optionName, optionDescription, perPerson, optionPrice } = req.body;
  const optionImage = req.file ? req.file.filename : ""; // Check if file exists


  try {
    const newOption = new Option({
      optionCategory,
      optionName,
      optionDescription,
      perPerson,
      optionPrice,
      optionImage
    });

    const savedOption = await newOption.save();
    res.json({ status: "Option Added", option: savedOption });
  } catch (error) {
    console.error("Error adding option:", error.message);
    res.status(500).send({ status: "Error with adding option", error: error.message });
  }
});






// Get all Options
router.route("/allOptions").get(async (req, res) => {
  try {
    const options = await Option.find();
    res.json(options);
  } catch (error) {
    console.error("Error fetching options:", error.message);
    res.status(500).send({ status: "Error with fetching options", error: error.message });
  }
});





// Update Option
router.route("/updateOption/:id").put(upload.single("file"), async (req, res) => {
  let optionId = req.params.id;
  const { optionCategory, optionName, optionDescription, perPerson, optionPrice } = req.body;
  const optionImage = req.file ? req.file.filename : ""; // Check if file exists
  
  try {
    const updateOption = {
      optionCategory,
      optionName,
      optionDescription,
      perPerson,
      optionPrice,
      optionImage
      
    };

    const updatedOption = await Option.findByIdAndUpdate(optionId, updateOption, { new: true });
    res.status(200).send({ status: "Option Updated", option: updatedOption });
  } catch (error) {
    console.error("Error updating option:", error.message);
    res.status(500).send({ status: "Error with updating option", error: error.message });
  }
});




// Delete option
router.route("/deleteOption/:id").delete(async (req, res) => {
  let optionId = req.params.id;

  try {
    await Option.findByIdAndDelete(optionId);
    res.status(200).send({ status: "Option Deleted" });
  } catch (error) {
    console.error("Error deleting option:", error.message);
    res.status(500).send({ status: "Error in deleting option", error: error.message });
  }
});



// Get one option by ID
router.route("/getOption/:id").get(async (req, res) => {
  let optionId = req.params.id;

  try {
    const option = await Option.findById(optionId);
    if (!option) {
      return res.status(404).send({ status: "Option not found" });
    }
    res.status(200).send({ status: "Option Fetched", option });
  } catch (error) {
    console.error("Error fetching option:", error.message);
    res.status(500).send({ status: "Error with get option", error: error.message });
  }
});

module.exports = router;
