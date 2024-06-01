const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  addAgency,
  allAgency,
  updateAgency,
  deleteAgency,
  specificAgency,
  getAgencyByRepresenterMail
} = require('../controllers/agencyController');

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

// POST /api/agencies/add
router.post('/add', upload.single("img"), addAgency);

// GET /api/agencies
router.get('/', allAgency);

// PUT /api/agencies/update/:id
router.put('/update/:id', updateAgency);

// DELETE /api/agencies/delete/:id
router.delete('/delete/:id', deleteAgency);

// GET /api/agencies/get/:id
router.get('/get/:id', specificAgency);

// Get specific agency by representer mail
router.get("/getByRepresenterMail/:representerMail", getAgencyByRepresenterMail)


module.exports = router;
