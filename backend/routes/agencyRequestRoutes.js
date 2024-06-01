const Router = require("express").Router();

let AgencyRequest = require("../models/agencyRequestModel");

Router.route("/AgencyNewRequest").post((req, res) => {
  const ArrivalDate = req.body.ArrivalDate;
  const DepartureDate = req.body.DepartureDate;
  const NoOfDays = Number(req.body.NoOfDays);
  const NoOfNights = Number(req.body.NoOfNights);
  const NoOfAdults = Number(req.body.NoOfAdults);
  const NoOfChildren = Number(req.body.NoOfChildren);
  const RoomType = req.body.RoomType;
  const RequestDescription = req.body.RequestDescription;
  const UserId = req.body.UserId;
  const AgencyId = req.body.AgencyId;
  const SentDate = req.body.SentDate;
  const Status = req.body.Status;

  const newAgencyRequest = new AgencyRequest({
    ArrivalDate,
    DepartureDate,
    NoOfDays,
    NoOfNights,
    NoOfAdults,
    NoOfChildren,
    RoomType,
    RequestDescription,
    UserId,
    AgencyId,
    SentDate,
    Status,
  });

  newAgencyRequest
    .save()
    .then(() => {
      res.json("Your Request Sent!");
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all requests from the database
// if want to get only one request use findbyid()  insted of find()

Router.route("/ClientNewRequest").get((req, res) => {
  AgencyRequest.find()
    .then((AgencyRequests) => {
      res.json(
        AgencyRequests.map((request) => ({
          id: request._id,
          ArrivalDate: request.ArrivalDate,
          DepartureDate: request.DepartureDate,
          NoOfDays: request.NoOfDays,
          NoOfNights: request.NoOfNights,
          NoOfAdults: request.NoOfAdults,
          NoOfChildren: request.NoOfChildren,
          RoomType: request.RoomType,
          RequestDescription: request.RequestDescription,
          UserId: request.UserId,
          AgencyId: request.AgencyId,
          SentDate: request.SentDate,
          Status: request.Status,
        }))
      );
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error fetching requests", error: err.message });
    });
});

// get the request by id

Router.route("/getRequestId/:requestId").get(async (req, res) => {
  let requestId = req.params.requestId; // Get the ID from the URL parameter

  try {
    const clientRequest = await AgencyRequest.findById(requestId);
    if (clientRequest) {
      res
        .status(200)
        .json({ status: "Request fetched", clientRequest: clientRequest });
    } else {
      res.status(404).json({ status: "Request not found" });
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ status: "Error with get request", error: err.message });
  }
});


// Define a route to fetch requests by userId
Router.get("/getRequestByUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const requests = await AgencyRequest.find({ UserId: userId }).exec();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a route to fetch requests by agencyId
Router.get("/getRequestsByAgency/:agencyId", async (req, res) => {
  try {
    const agencyId = req.params.agencyId;
    const requests = await AgencyRequest.find({ AgencyId: agencyId }).exec();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// update the request data
Router.route("/UpdateRequest/:requestId").put(async (req, res) => {
  const requestId = req.params.requestId; 
  const {
    ArrivalDate,
    DepartureDate,
    NoOfDays,
    NoOfNights,
    NoOfAdults,
    NoOfChildren,
    RoomType,
    RequestDescription,
    UserId,
    AgencyId,
    SentDate,
    Status,
  } = req.body; // capture the data from the frontend

  const updateAgencyRequest = {
    // create an object to update the data
    ArrivalDate,
    DepartureDate,
    NoOfDays,
    NoOfNights,
    NoOfAdults,
    NoOfChildren,
    RoomType,
    RequestDescription,
    UserId,
    AgencyId,
    SentDate,
    Status,
  };

  try {
    const updatedRequest = await AgencyRequest.findByIdAndUpdate(
      requestId,
      updateAgencyRequest
    );
    if (updatedRequest) {
      res.status(200).json({ message: "Request Updated" }); // send the response to the frontend
    } else {
      res.status(404).json({ status: "Request not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error with updating data" }); // send the response to the frontend
  }
});

// delete the request
Router.route("/DeleteRequest/:requestId").delete(async (req, res) => {
  let requestId = req.params.requestId;
  await AgencyRequest.findByIdAndDelete(requestId)
    .then(() => {
      res.status(200).send({ status: "Request Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete request", error: err.message });
    });
});

module.exports = Router; // Export the Router object
