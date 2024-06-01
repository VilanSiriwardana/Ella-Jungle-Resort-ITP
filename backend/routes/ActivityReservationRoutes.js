const express = require('express');
const router = express.Router();
let Reservation = require("../models/ActivityReservation");

router.post("/confirmactivity/:id", (req, res) => {


    // Fetch the activity ID from the URL parameter
    let activityId = req.params.id; 

    //set a default value for guestID
    const defaultGuestID =req.body.userId;

    // Extract  activity name from the request body
    const activityName  = req.body.activityName; 

    const noOfPeople  = req.body.noOfPeople; 

    const activityPrice  = req.body.activityPrice; 

    const totalPrice  = req.body.totalPrice; 

    const maxNoOfGuests = req.body.maxNoOfGuests;

    const newReservation = new Reservation({
        activityID: activityId, // Assign the fetched activity ID
        guestID: defaultGuestID,
        activityName: activityName,
        noOfPeople:noOfPeople,
        activityPrice:activityPrice,
        totalPrice: totalPrice,
        maxNoOfGuests: maxNoOfGuests,
        
    });

    newReservation.save().then(() => {
        res.json("Apply");
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while confirming the application" });
    });
});

//to view all the values added
router.route("/allActivityReservation").get((req,res)=>{
    Reservation.find().then((Reservation)=>{
        res.json(Reservation)
    }).catch((err)=>{
        console.log(err)
    })


    
})

// Route to fetch the count of reservations for each activity
router.get("/activityCount", async (req, res) => {
    try {
        const activityCounts = await Reservation.aggregate([
            { $group: { _id: "$activityID", count: { $sum: 1 } } },
            { $match: { count: { $gte: 3 } } } // Filter activities with count >= 3
        ]);
        res.json(activityCounts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching activity counts" });
    }
});



module.exports = router;