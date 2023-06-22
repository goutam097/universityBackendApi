const router = require("express").Router();
const galleryController = require("../../controllers/api/gallery.controller");

router.get("/galleryList", galleryController.galleryList);
// router.post("/masterDetails", masterController.masterDetails);
router.post("/galleryCreate", galleryController.galleryCreate);
// router.post("/masterDelete", masterController.masterDelete);


module.exports = router;