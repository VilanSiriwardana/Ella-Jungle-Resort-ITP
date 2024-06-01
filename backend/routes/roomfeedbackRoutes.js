const router = require("express").Router();
const Roomfeedback = require("../models/roomFeedbackModel");

// Create room feedback
router.post("/addfeedback", (req, res) => {
    const { fbtitle, fbdescription, rating, giverName, giverId, roomname, roomId } = req.body;

    const newFeedback = new Roomfeedback({
        fbtitle,
        fbdescription,
        rating,
        giverName,
        giverId,
        roomname,
        roomId
    });

    newFeedback.save()
        .then(() => res.json("Feedback Added."))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Read all room feedbacks
router.get("/", (req, res) => {
    Roomfeedback.find()
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get room feedbacks by giverName
router.get("/feedbacksByGiver/:giverName", (req, res) => {
    const { giverName } = req.params;

    Roomfeedback.find({ giverName })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given name.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

// Get room feedbacks by giverId
router.get("/feedbacksByGiverId/:giverId", (req, res) => {
    const { giverId } = req.params;

    Roomfeedback.find({ giverId })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given ID.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

// Update room feedback
router.put("/updatefeedback/:id", (req, res) => {
    const { fbtitle, fbdescription, rating, roomname, roomId } = req.body;
    const { id } = req.params;

    Roomfeedback.findByIdAndUpdate(id, { fbtitle, fbdescription, rating, roomname, roomId }, { new: true })
        .then(updatedFeedback => res.json({ status: "Feedback Updated.", updatedFeedback }))
        .catch(err => res.status(400).json("Error: " + err));
});

// Delete room feedback
router.delete("/deletefeedback/:id", (req, res) => {
    const { id } = req.params;

    Roomfeedback.findByIdAndDelete(id)
        .then(() => res.json({ status: "Feedback deleted." }))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get last 4 added Room Feedbacks
router.get("/lastFeedbacks", (req, res) => {
    Roomfeedback.find().sort({ createdAt: -1 }).limit(4)
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get room feedbacks by roomName
router.get("/feedbacksByRoomName/:roomName", (req, res) => {
    const { roomName } = req.params;

    Roomfeedback.find({ roomname: roomName })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given room name.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

// Get room feedbacks by roomId
router.get("/feedbacksByRoomId/:roomId", (req, res) => {
    const { roomId } = req.params;

    Roomfeedback.find({ roomId })
        .then(feedbacks => {
            if (feedbacks.length) {
                res.json(feedbacks);
            } else {
                res.status(404).json("No feedbacks found for the given room ID.");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
