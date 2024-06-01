
const router = require ("express").Router();
let Ticket = require("../models/Ticket")      //Using Ticket model in Models folder

router.route("/buyTicket").post((req,res) => {
    const { eventId, eventName, ticketUserId, ticketUserName, ticketUserEmail, ticketUserMobile, ticketCount, totalTicketCost, ticketBuyingDate, ticketBuyingTime } = req.body;

    const newTicket = new Ticket({
        eventId,
        eventName,
        ticketUserId,
        ticketUserName,
        ticketUserEmail,
        ticketUserMobile,
        ticketCount,
        totalTicketCost,
        ticketBuyingDate,
        ticketBuyingTime

    })


    newTicket.save().then(() => {      //If Successful
        res.json("Ticket Buyed")       //A response in json format to the frontend
    }).catch((err) => {
        console.log(err);               //If Unsuccessful
    })
})



//If you run this URL - http://localhost:8070/ticket, the body of this below function is executed
router.route("/allTickets").get((req,res) => {
    Ticket.find().then((tickets) => {
        res.json(tickets)
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with buying ticket", error:err.message});
    })
})




/*Updating details of a ticket*/
//When http://Localhost:8070/ticket/updateTicket/5fdeu38rsfk is run, 5fdeu38rsfk user is updated
//':id' colon id is says "Fetch whatever comes after the slash as the studentID". Colon is a must
router.route("/updateTicket/:id").put(async(req,res) => {         //Always an Asynchronous message wait for a promise. This increases functionality
    let ticketId = req.params.id;

    const {eventId, eventName, ticketUserId, ticketUserName, ticketUserEmail, ticketUserMobile, ticketCount, totalTicketCost, ticketBuyingDate, ticketBuyingTime} = req.body;

    //Create 'update object'
    const updateTicket = {
        eventId,
        eventName,
        ticketUserId,
        ticketUserName,
        ticketUserEmail,
        ticketUserMobile,
        ticketCount,
        totalTicketCost,
        ticketBuyingDate,
        ticketBuyingTime
    }

    //If you didn't use the ID as Primary Key, you can use findOneAndUpdate, here.
    //Await helps to halt the function until the promise from async is received
    const update = await Ticket.findByIdAndUpdate(ticketId, updateTicket)       //Pass the update object as parameter
    .then(() => {
        res.status(200).send({status:"Ticket Updated"});                      //Success error code:200
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating Ticket", error:err.message});        //Server error code:500
    })
})




/*Deleting a student*/
router.route("/deleteTicket/:id").delete(async(req,res) => {
    let ticketId = req.params.id;

    await Ticket.findByIdAndDelete(ticketId)
    .then(() => {
        res.status(200).send({status:"Ticket Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error in deleting user", error:err.message});
    })
})




/*Getting details of one user */
router.route("/getTicket/:id").get(async(req,res) => {
    let ticketId = req.params.id;
    const user = await Student.findById(ticketId)
    .then((ticket)=> {
        res.status(200).send({status: "User Fetched", student});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;