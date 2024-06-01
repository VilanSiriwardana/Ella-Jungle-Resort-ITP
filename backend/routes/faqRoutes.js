const router = require("express").Router();
const FAQ = require("../models/faqModel");

// Insert / Create FAQ
router.post("/addfaq", (req, res) => {
    const { faqtitle, faqdescription, giverName, giverId } = req.body;

    const newFAQ = new FAQ({
        faqtitle,
        faqdescription,
        giverName,
        giverId
    });

    newFAQ.save()
        .then(() => res.json("FAQ Added."))
        .catch(err => res.status(400).json("Error: " + err));
});

// Read all FAQs
router.get("/", (req, res) => {
    FAQ.find()
        .then(faqs => res.json(faqs))
        .catch(err => res.status(400).json("Error: " + err));
});

// Read FAQs by giverId
router.get("/bygiver/:giverId", (req, res) => {
    const { giverId } = req.params;

    FAQ.find({ giverId })
        .then(faqs => res.json(faqs))
        .catch(err => res.status(400).json("Error: " + err));
});

// Delete an FAQ
router.delete("/deletefaq/:id", (req, res) => {
    const { id } = req.params;

    FAQ.findByIdAndDelete(id)
        .then(() => res.json("FAQ deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

// Add a reply to an FAQ
router.put("/addreply/:id", (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;

    FAQ.findByIdAndUpdate(id, { $push: { replies: reply } }, { new: true })
        .then(faq => res.json("Reply added."))
        .catch(err => res.status(400).json("Error: " + err));
});

// Delete a reply from an FAQ
router.put("/deletereply/:id", (req, res) => {
    const { id } = req.params;
    const { index } = req.body;

    FAQ.findById(id)
        .then(faq => {
            if (!faq) {
                return res.status(404).json("FAQ not found.");
            }
            faq.replies.splice(index, 1);
            return faq.save();
        })
        .then(updatedFAQ => res.json("Reply deleted."))
        .catch(err => res.status(500).json("Error: " + err));
});


// get the latest faqs
router.get("/recent", (req, res) => {
    FAQ.find().sort({ createdAt: -1 }).limit(4)
        .then(faqs => res.json(faqs))
        .catch(err => res.status(400).json("Error: " + err));
});



// update faq
router.put("/updatefaq/:id", (req, res) => {
    const { id } = req.params;
    const { faqtitle, faqdescription } = req.body;
  
    FAQ.findByIdAndUpdate(id, { faqtitle, faqdescription }, { new: true })
      .then(updatedFaq => res.json(updatedFaq))
      .catch(err => res.status(400).json("Error: " + err));
  });
  


module.exports = router;
