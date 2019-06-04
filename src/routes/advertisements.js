const express = require("express");
const router = express.Router();
const adsController = require("../controllers/adsController");

router.get("/advertisements", adsController.index);
router.get("/advertisements/new", adsController.new);
router.get("/advertisements/:id", adsController.show);
router.get("/advertisements/:id/edit", adsController.edit);

router.post("/advertisements/create", adsController.create);
router.post("/advertisements/:id/destroy", adsController.destroy);
router.post("/advertisements/:id/update", adsController.update);

module.exports = router;
