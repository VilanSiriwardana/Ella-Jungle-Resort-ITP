const router = require("express").Router();
const Agencyfeedback = require("../models/agencyfeedbackModel"); 

// Create feedback
router.post("/addfeedback", (req, res) => {
    const { fbtitle, fbdescription, rating, giverName, giverId, agencyname, agencyId } = req.body;

    const newFeedback = new Agencyfeedback({
        fbtitle,
        fbdescription,
        rating,
        giverName,
        giverId,
        agencyname,
        agencyId
    });

    newFeedback.save()
        .then(() => res.json("Feedback Added."))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Read all feedbacks
router.get("/", (req, res) => {
    Agencyfeedback.find()
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get feedbacks by giverName
router.get("/feedbacksByGiver/:giverName", (req, res) => {
    const { giverName } = req.params;

    Agencyfeedback.find({ giverName })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given name.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

// Get feedbacks by giverId
router.get("/feedbacksByGiverId/:giverId", (req, res) => {
    const { giverId } = req.params;

    Agencyfeedback.find({ giverId })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given ID.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

// Update feedback
router.put("/updatefeedback/:id", (req, res) => {
    const { fbtitle, fbdescription, rating, agencyname, agencyId } = req.body;
    const { id } = req.params;

    Agencyfeedback.findByIdAndUpdate(id, { fbtitle, fbdescription, rating, agencyname, agencyId }, { new: true })
        .then(updatedFeedback => res.json({ status: "Feedback Updated.", updatedFeedback }))
        .catch(err => res.status(400).json("Error: " + err));
});

// Delete feedback
router.delete("/deletefeedback/:id", (req, res) => {
    const { id } = req.params;

    Agencyfeedback.findByIdAndDelete(id)
        .then(() => res.json({ status: "Feedback deleted." }))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get last 4 added Feedbacks
router.get("/lastFeedbacks", (req, res) => {
    Agencyfeedback.find().sort({ createdAt: -1 }).limit(4)
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).json("Error: " + err));
});



// Get feedbacks by agencyName
router.get("/feedbacksByAgencyName/:agencyName", (req, res) => {
    const { agencyName } = req.params;

    Agencyfeedback.find({ agencyname: agencyName })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given agency name.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

// Get feedbacks by agencyId
router.get("/feedbacksByAgencyId/:agencyId", (req, res) => {
    const { agencyId } = req.params;

    Agencyfeedback.find({ agencyId })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given agency ID.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});






module.exports = router;
