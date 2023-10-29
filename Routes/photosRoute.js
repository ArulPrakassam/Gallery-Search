const express = require("express");

const router = express.Router();
const {
  photos,
  search,
  fetchData,
} = require("../controllers/photosController");

router.get("/", photos, fetchData);
router.get("/search", search, fetchData);

module.exports = router;
