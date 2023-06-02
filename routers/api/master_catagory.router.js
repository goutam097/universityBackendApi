const router = require("express").Router();
const masterController = require("../../controllers/api/master_catagory.controller");

router.get("/masterList", masterController.masterList);
router.post("/masterDetails", masterController.masterDetails);
router.post("/masterCreate", masterController.masterCreate);
router.post("/masterDelete", masterController.masterDelete);


module.exports = router;