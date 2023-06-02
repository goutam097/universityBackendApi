const router = require("express").Router();
const blogController = require("../../controllers/api/blog.controller");

router.get("/blogList", blogController.blogList);
router.post("/blogDetails", blogController.blogDetails);
router.post("/blogCreate", blogController.blogCreate);


module.exports = router;