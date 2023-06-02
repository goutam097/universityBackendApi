const router = require("express").Router();
const todoRouter = require("./api/todo.router");
const blogRouter = require("./api/blog.router");
const userRouter = require("./api/user.router");
const bannerRouter = require("./api/banner.router");
const masterRouter = require("./api/master_catagory.router");

router.use("/todo", todoRouter);
router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/banner", bannerRouter);
router.use("/master", masterRouter);

module.exports = router;
