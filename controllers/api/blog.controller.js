const Op = require("sequelize").Op;
const BlogModel = require("../../models/blog.model");
const imageUpload = require("../../helpers/image.upload");

exports.blogList = async (req, res) => {
    try {
      const postList = await BlogModel.findAll();
  
      const resultArray = await Promise.all(
        postList.map(async (post) => {
          const image = post.image
            ? `${req.app.locals.baseurl}/uploads/members/${post.image}`
            : null;
  
          return {
            id:post.id,
            title: post.title,
            description: post.description,
            image: image,
          };
        })
      );
  
      return res.status(200).send({
        success: true,
        details: resultArray,
        errorNode: { errorCode: 0, errorMsg: "No error" },
      });
    } catch (error) {
      // Handle any potential errors here
      return res.status(500).send({
        success: false,
        details: [],
        errorNode: { errorCode: 1, errorMsg: "Internal server error" },
      });
    }
  };
  

exports.blogCreate = async (req, res) => {
    const id = req?.body?.id || null;
    const title = req?.body?.title || null;
    const description = req?.body?.description || null;
    const image = req?.body?.image || null;
    const imageExt = req?.body?.imageExt || null;
    const dir = "./public/uploads/members";

    try {
        const data = {
            id, title, description,image
        }
        console.log(JSON.stringify(data)+'1111111111111111111111')
        if(id) {
            await BlogModel.update(data,{ where:{id:id}});
            if (image && imageExt) {
                const imageName = await imageUpload(dir, image, imageExt);
                await BlogModel.update(
                  {
                    image: imageName,
                  },
                  { where: { id: id } }
                );
              }
              return res.status(200).send({
                data: {
                  success: true,
                  message: "Successfully updated",
                },
                errorNode: { errorCode: 0, errorMsg: "No Error" },
              });
        } else {
      const blogDetails = await BlogModel.create(data);
      if (image && imageExt) {
        const imageName = await imageUpload(dir, image, imageExt);
        await BlogModel.update(
          {
            image: imageName,
          },
          { where: { id: blogDetails.id } }
        );
      }
      return res.status(201).send({
        data: {
          success: true,
          message: "Successfully created",
        },
        errorNode: { errorCode: 0, errorMsg: "No Error" },
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
}


exports.blogDetails = async (req, res) => {
    try {
      const { id } = req?.body || {};
  
      let postDetails = await BlogModel.findOne({ where: { id } });
  
      const postImage = await BlogModel.findOne({
        attributes: ["id", "title", "description", "image"],
        where: { id },
      });
  
      postDetails.dataValues.image =      
        postImage && postImage.image
          ? `${req.app.locals.baseurl}/uploads/members/${postImage.image}`
          : `${req.app.locals.baseurl}/noimage.png`;
  
      return res.status(200).send({
        data: {
          success: true,
          details: postDetails.dataValues,
        },
        errorNode: { errorCode: 0, errorMsg: "No error" },
      });
    } catch (error) {
      return res.status(500).send({
        data: { success: false, message: "Something went wrong" },
        errorNode: { errorCode: 1, errorMsg: error },
      });
    }
  };

  