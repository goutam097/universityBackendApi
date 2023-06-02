const router = require("express").Router();
const todoController = require("../../controllers/api/todo.controller");

router.post("/todoList", todoController.todoList);
router.post("/todoDetails", todoController.todoDetails);
router.post("/todoCreate", todoController.todoCreate);
router.post("/todoDelete", todoController.todoDelete);
router.post("/downloadCSV", todoController.downloadCSV);
// router.get("/downloadCSV", todoController.downloadCSV);


module.exports = router;