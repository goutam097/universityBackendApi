const router = require("express").Router();
const bannerController = require("../../controllers/api/banner.controller");

router.get("/bannerList", bannerController.bannerList);
router.post("/bannerCreate", bannerController.bannerCreate);
router.post("/bannerDetails", bannerController.bannerDetails);
router.post("/bannerDelete", bannerController.bannerDelete);

module.exports = router;