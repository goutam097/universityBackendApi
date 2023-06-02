const Op = require("sequelize").Op;
const sequelize = require("sequelize");
const { Parser } = require('json2csv');
// const moment = require("moment");

const TodoModel = require("../../models/todo.controller");


// exports.todoList = async (req, res) => {
//   const title = req.query.title && req.query.title != "null" ? req.query.title : "";
//   const description = req.query.description && req.query.description != "null" ? req.query.description : "";
//   const limit = req.query.limit ? Number(req.query.limit) : 3;
//   const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
//   const offset = Number(((pageNumber) - 1) * limit);

//   let dataCount = 0;

//     try {
//         let todoList = await TodoModel.findAll({
//             // where: { id: id },
//         });
//         if (todoList.length > 0) {
//             return res.status(200).send({
//                 data: {
//                     success: true,
//                     details: todoList
//                 },
//                 errorNode: { errorCode: 0, errorMsg: "No error" },
//             });
//         } else {
//             return res.status(200).send({
//                 data: {
//                     success: true,
//                     message: "No Data Found",
//                     details: []
//                 },
//                 errorNode: { errorCode: 0, errorMsg: "No error" },
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             data: {
//                 success: false,
//                 message: "Something went wrong! Please try again",
//             },
//             errorNode: { errorCode: 1, errorMsg: error },
//         });
//     }
// }

exports.todoList = async (req, res) => {
  const title = req.query.title && req.query.title != "null" ? req.query.title : "";
  const description = req.query.description && req.query.description != "null" ? req.query.description : "";
  const limit = req.body.limit ? Number(req.body.limit) : 5;
  const pageNumber = req.body.pageNumber ? Number(req.body.pageNumber) : 5;
  const offset = Number(((pageNumber) - 1) * limit);

  let dataCount = 0;
  let dataItems;

  try {
    // if (id != '' || gender != '') {
    dataItems = await TodoModel.findAll({

      where: {
        [Op.and]: [
          { title: { [Op.like]: `%${title}%` } },
          // { id: { [Op.like]: `%${id}%` } },
          { description: { [Op.like]: `%${description}%` } },
        ],
      },
      limit,
      offset,
    });
    dataCount = await TodoModel.count({
      where: {
        [Op.and]: [
          { title: { [Op.like]: `%${title}%` } },
          // { id: { [Op.like]: `%${id}%` } },
          { description: { [Op.like]: `%${description}%` } },
        ],
      },
    });
    console.log(dataCount);
    // } else {
    //   dataItems = await Dashboard.findAll({
    //     where: {
    //       [Op.or]: [
    //         { gender: { [Op.like]: `%${keyword}%` } },
    //         { id: { [Op.like]: `%${keyword}%` } },
    //         { phone: { [Op.like]: `%${phone}%` } },
    //       ],
    //     },
    //     limit,
    //     offset,
    //   });
    //   dataCount = await Dashboard.count({
    //     where: {
    //       [Op.or]: [
    //         { gender: { [Op.like]: `%${keyword}%` } },
    //         { id: { [Op.like]: `%${keyword}%` } },
    //         { phone: { [Op.like]: `%${phone}%` } },
    //       ],
    //     },
    //   })
    // }

    // console.log("employeeId");/
    if (dataItems) {
      return res.status(200).send({
        data: {
          success: true,
          details: dataItems,
          count: dataCount,
        },
        errorNode: {
          errorCode: 0,
          errorMsg: "no error",
        },
      });
    } else {
      return res.status(200).send({
        data: {
          success: true,
          message: "No Data Found",
          details: []
        },
        errorNode: { errorCode: 0, errorMsg: "No error" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      data: {
        sucess: false,
        details: "Something went wrong!! please try again",
      },
      errorNode: { errorCode: 1, errorMsg: "error" },
    });
  }
};


exports.todoDetails = async (req, res) => {
  const id = req?.body?.id || null;
  if (id && id != null && id != '') {
    try {
      const todoDetails = await TodoModel.findOne({
        where: { id: id },
      });
      if (todoDetails) {
        return res.status(200).send({
          data: {
            success: true,
            details: todoDetails,
          },
          errorNode: { errorCode: 0, errorMsg: "No error" },
        });
      } else {
        return res.status(400).send({
          data: { success: false, message: "no record found" },
          errorNode: { errorCode: 1, errorMsg: "no record found" },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        data: {
          success: false,
          message: "Something went wrong! Please try again",
        },
        errorNode: { errorCode: 1, errorMsg: error },
      });
    }
  } else {
    return res.status(400).send({
      data: { success: false, message: "id is required" },
      errorNode: { errorCode: 1, errorMsg: "id is required" },
    });
  }
}

exports.todoCreate = async (req, res) => {
  const id = req?.body?.id || null;
  const title = req?.body?.title || null;
  const description = req?.body?.description || null;

  if (title && title != null && title != '') {
    try {
      if (id) {
        let todoWorkCreate = await TodoModel.update({
          title: title,
          description: description,
          id: id
        }, { where: { id: id } });

        return res.status(201).send({
          data: { success: true, details: todoWorkCreate, message: "Successfully updated" },
          errorNode: { errorCode: 0, errorMsg: "No Error" },
        });
      } else {
        let todoWorkCreate = await TodoModel.create({
          title: title,
          description: description,
          id: id
        });
        return res.status(201).send({
          data: { success: true, details: todoWorkCreate, message: "Successfully Created" },
          errorNode: { errorCode: 0, errorMsg: "No Error" },
        });
      }
    } catch (error) {
      return res.status(500).send({
        data: { success: false, message: "Something went wrong" },
        errorNode: { errorCode: 1, errorMsg: error },
      });
    }
  } else {
    return res.status(400).send({
      data: { success: false, message: "Title is required" },
      errorNode: { errorCode: 1, errorMsg: "Title is required" },
    });
  }
};


exports.todoDelete = async (req, res) => {
  try {
    const id = req?.body?.id || null;

    if (id && id != null && id != '') {

      await TodoModel.destroy({ where: { id: id } });

      return res.status(200).send({
        data: { success: true, message: "Todo List successfully deleted" },
        errorNode: { errorCode: 0, errorMsg: "Todo List successfully deleted" },
      });
    } else {
      return res.status(400).send({
        data: { success: false, message: "id is required" },
        errorNode: { errorCode: 1, errorMsg: "id is required" },
      });
    }
  } catch (error) {
    return res.status(500).send({
      data: { success: false, message: "Something went wrong" },
      errorNode: { errorCode: 1, errorMsg: error },
    });
  }
};

exports.downloadCSV = async (req, res) => {
  try {
    let id = req.body.id || null;
      if (!id)
        return res.status(400).send({ data: { success: false, details: "Id is required" }, errorNode: { errorCode: 1, errorMsg: "Error" } });
    let mainArr = []
    let downloadCsvForEmployee = await TodoModel.findAll({ attributes: [ 'id','title', 'description'], 
    where: { id: id } 
  });
    const csvFields = ["id","Title","Description"]
    csvFields.push(downloadCsvForEmployee)
    for (let data of downloadCsvForEmployee) {
      const mainObj = {
        "Id": data.id,
        "Title": data.title,
        "Description": data.description
      }
      mainArr.push(mainObj)
    }
    const csvParser = new Parser({ csvFields });
    const csvData = csvParser.parse(mainArr);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=Employee.csv");
    res.status(200).send(csvData);

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      data: {
        success: false,
        message: "Something went wrong! Please try again later"
      },
      errorNode: { errorCode: 1, errorMsg: error }
    })
  }
}

