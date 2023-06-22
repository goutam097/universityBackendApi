const router = require("express").Router();
const blogRouter = require("./api/blog.router");
const userRouter = require("./api/user.router");
const bannerRouter = require("./api/banner.router");
const masterRouter = require("./api/master_catagory.router");
const galleryRouter = require("./api/gallery.router");

router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/banner", bannerRouter);
router.use("/master", masterRouter);
router.use("/gallery", galleryRouter);

module.exports = router;
