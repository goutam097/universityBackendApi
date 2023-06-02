const Op = require("sequelize").Op;
const path = require('path');
const BannerModel = require("../../models/banner_section.model");
const imageUpload = require("../../helpers/image.upload");

exports.bannerList = async (req, res) => {
    try {
      const bannerList = await BannerModel.findAll();
  
      const resultArray = await Promise.all(
        bannerList.map(async (post) => {
          const image = post.image
            ? `${req.app.locals.baseurl}/uploads/banners/${post.image}`
            : null;
  
          return {
            id:post.id,
            title: post.title,
            heading: post.heading,
            small_description: post.small_description,
            long_description: post.long_description,
            status: post.status,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
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


  exports.bannerCreate = async (req, res) => {
    const id = req?.body?.id || null;
    const title = req?.body?.title || null;
    const heading = req?.body?.heading || null;
    const small_description = req?.body?.small_description || null;
    const long_description = req?.body?.long_description || null;
    const status = req?.body?.status || null;
    const createdAt = req?.body?.createdAt || null;
    const updatedAt = req?.body?.updatedAt || null;
    const image = req?.body?.image || null;
    const imageExt = req?.body?.imageExt || null;
    const dir = "./public/uploads/banners";

    try {
        const data = {
            id, title, heading,small_description,long_description,status,createdAt,updatedAt,image
        }
        console.log(JSON.stringify(data)+'1111111111111111111111')
        if(id) {
            await BannerModel.update(data,{ where:{id:id}});
            if (image && imageExt) {
                const imageName = await imageUpload(dir, image, imageExt);
                await BannerModel.update(
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
      const bannerDetails = await BannerModel.create(data);
      if (image && imageExt) {
        const imageName = await imageUpload(dir, image, imageExt);
        await BannerModel.update(
          {
            image: imageName,
          },
          { where: { id: bannerDetails.id } }
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

/* exports.bannerDetails = async (req, res) => {
    const { id } = req?.body || {};
    if (id && id != null && id != '') {
    try {
      let bannerDetails = await BannerModel.findOne({ where: { id } });
  
      const postImage = await BannerModel.findOne({
        // attributes: ["id", "title","heading","small_description","long_description","status", "image"],
        where: { id },
        attributes: ["id", "title"],

      });
  
      bannerDetails.dataValues.image =      
        postImage && postImage.image
          ? `${req.app.locals.baseurl}/uploads/banners/${postImage.image}`
          : `${req.app.locals.baseurl}/noimage.png`;
  
      return res.status(200).send({
        data: {
          success: true,
          details: bannerDetails.dataValues,
        },
        errorNode: { errorCode: 0, errorMsg: "No error" },
      });
    } catch (error) {
      return res.status(500).send({
        data: { success: false, message: "Something went wrong" },
        errorNode: { errorCode: 1, errorMsg: error },
      });
    }
} else {
    return res.status(400).send({
      data: { success: false, message: "id is required" },
      errorNode: { errorCode: 1, errorMsg: "id is required" },
    });
  }
  }; */

  exports.bannerDetails = async (req, res) => {
    const { id } = req.body || {};
  
    if (!id) {
      return res.status(400).send({
        data: { success: false, message: 'id is required' },
        errorNode: { errorCode: 1, errorMsg: 'id is required' },
      });
    }
  
    try {
      const bannerDetails = await BannerModel.findOne({
        where: { id },
        attributes: ['id', 'title', 'heading', 'small_description', 'long_description', 'status', 'image'],
      });
  
      if (!bannerDetails) {
        return res.status(404).send({
          data: { success: false, message: 'Banner not found' },
          errorNode: { errorCode: 1, errorMsg: 'Banner not found' },
        });
      }
  
      const imageUrl = bannerDetails.image
        ? path.join(req.app.locals.baseurl, 'uploads', 'banners', bannerDetails.image)
        : path.join(req.app.locals.baseurl, 'noimage.png');
  
      const responseData = {
        success: true,
        details: {
          ...bannerDetails.dataValues,
          image: imageUrl,
        },
      };
  
      return res.status(200).send({
        data: responseData,
        errorNode: { errorCode: 0, errorMsg: 'No error' },
      });
    } catch (error) {
      return res.status(500).send({
        data: { success: false, message: 'Something went wrong' },
        errorNode: { errorCode: 1, errorMsg: error.message },
      });
    }
  };

  exports.bannerDelete = async (req, res) => {
    try {
      const id = req.body?.id || null;
  
      if (!id) {
        return res.status(400).send({
          data: { success: false, message: 'id is required' },
          errorNode: { errorCode: 1, errorMsg: 'id is required' },
        });
      }
  
      await BannerModel.destroy({ where: { id } });
  
      return res.status(200).send({
        data: { success: true, message: 'Banner successfully deleted' },
        errorNode: { errorCode: 0, errorMsg: 'Banner successfully deleted' },
      });
    } catch (error) {
      return res.status(500).send({
        data: { success: false, message: 'Something went wrong' },
        errorNode: { errorCode: 1, errorMsg: error.message },
      });
    }
  };
  

//   exports.bannerDelete = async (req, res) => {
//     try {
//       const id = req?.body?.id || null;
  
//       if (id && id != null && id != '') {
  
//         await BannerModel.destroy({ where: { id: id } });
  
//         return res.status(200).send({
//           data: { success: true, message: "Banner List successfully deleted" },
//           errorNode: { errorCode: 0, errorMsg: "Banner List successfully deleted" },
//         });
//       } else {
//         return res.status(400).send({
//           data: { success: false, message: "id is required" },
//           errorNode: { errorCode: 1, errorMsg: "id is required" },
//         });
//       }
//     } catch (error) {
//       return res.status(500).send({
//         data: { success: false, message: "Something went wrong" },
//         errorNode: { errorCode: 1, errorMsg: error },
//       });
//     }
//   };

