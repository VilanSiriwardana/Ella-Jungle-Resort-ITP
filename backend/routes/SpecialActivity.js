//import router functions in express package
const router = require("express").Router();
let SpecialActivity = require("../models/SpecialActivity");
const multer = require("multer");
const path = require("path");



// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/src/assets/"); // Set destination folder
    },
    filename: function (req, file, cb) {
      // Set filename to current timestamp + original file extension
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });


// Multer instance
const upload = multer({ storage: storage }).single('image');






// Route to add a new special activity
router.post("/add", (req, res) => {
    // Use Multer middleware to handle file upload
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error occurred
        console.error("Multer error:", err);
        return res.status(500).send("An error occurred during file upload.");
      } else if (err) {
        // Unknown error occurred
        console.error("Unknown error:", err);
        return res.status(500).send("An unknown error occurred.");
      }
  


      // File upload successful, continue with adding the activity
      const { name, description, distance, price,noOfGuests } = req.body;
      const image = req.file ? req.file.filename : ""; // If no file uploaded, set empty string
  


      try {
        const newSpecialActivity = new SpecialActivity({
          name,
          image,
          description,
          distance,
          price,
          noOfGuests,
        });

        await newSpecialActivity.save();
        console.log("Special Activity added:", newSpecialActivity);
        res.status(201).json({ message: "Special Activity added", specialActivity: newSpecialActivity });


      } catch (error) {
        console.error("Error adding special activity:", error);
        res.status(400).json({ error: "Error adding special activity" });
      }
    });
});




//to view all the values added
router.route("/").get((req,res)=>{
    SpecialActivity.find().then((SpecialActivity)=>{
        res.json(SpecialActivity)
    }).catch((err)=>{
        console.log(err)
    })
})





//to update values
router.route("/update/:id").put(async(req,res)=>{

    //fetch the id comes as a parameter in the request
    let userId = req.params.id;
    
    //fetching the newly updated data in destructive format
    const{name,image,description,distance,price,noOfGuests}=req.body;

    //creating an object to update the data
    const updateSpecialActivity={
        name,
        image,
        description,
        distance,
        price,
        noOfGuests
    };
    




    //to check whether an activity exists related to a specific id
    try {
        const updatedActivity = await SpecialActivity.findByIdAndUpdate(userId, updateSpecialActivity, { new: true });
        if (!updatedActivity) {
            return res.status(404).send({ status: "Special Activity not found" });
        }
        res.status(200).send({ status: "Special Activity updated", updatedActivity });


    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }

});





//to delete a user
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await SpecialActivity.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"Special Activity deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting special actvities", error:err.message});
    })
})




//to retreive data of a one activity
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;

    try {
        const specialActivity = await SpecialActivity.findById(userId);
        if (!specialActivity) {
            return res.status(404).send({ status: "Special Activity not found" });
        }
        res.status(200).send({ status: "Special Activity fetched", specialActivity });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get activity", error: err.message });
    }
});




//to view all the activities added in home page for guests
router.route("/home").get((req,res)=>{
  SpecialActivity.find().then((SpecialActivity)=>{
      res.json(SpecialActivity)
  }).catch((err)=>{
      console.log(err)
  })
})



//to retreive data of a one activity for reservation
router.route("/apply/:id").get(async(req,res)=>{
  let userId = req.params.id;

  try {
      const specialActivity = await SpecialActivity.findById(userId);
      if (!specialActivity) {
          return res.status(404).send({ status: "Special Activity not found" });
      }
      res.status(200).send({ status: "Special Activity fetched", specialActivity });
  } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with get activity", error: err.message });
  }
});




module.exports = router;