const Op = require("sequelize").Op;
const GalleryModel = require("../../models/gallery.model");
const imageUpload = require("../../helpers/image.upload");
const slugify = require("../../helpers/slugify");
const path = require('path');


exports.galleryList = async (req, res) => {
    try {
      const galleryList = await GalleryModel.findAll();
  
      const resultArray = await Promise.all(
        postList.map(async (post) => {
          const image = post.image
            ? `${req.app.locals.baseurl}/uploads/gallery/${post.image}`
            : null;
  
          return { 
            id:post.id,
            catagorySlug:post.catagorySlug,
            slug: post.slug,
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


  exports.galleryCreate = async (req, res) => {
    try {
      const id = req?.body?.id || null;
      const status = req?.body?.status || null;
      const createdAt = req?.body?.createdAt || null;
      const updatedAt = req?.body?.updatedAt || null;
      const image = req?.body?.image || null;
      const imageExt = req?.body?.imageExt || null;
  
      const dir = "./public/uploads/gallery";
  
      let slug = await slugify(image);
      const slugCount = await GalleryModel.count({ where: { slug } });
      if (slugCount) slug = `${slug}${slugCount}`;
  
      const data = {
        slug,
        status,
        createdAt,
        updatedAt,
        image,
      };
  
      if (id) {
        await GalleryModel.update(data, { where: { id } });
  
        if (iamge && iamgeExt) {
          const iamgeName = await imageUpload(dir, iamge, iamgeExt);
          await GalleryModel.update(
            {
              iamge: iamgeName,
            },
            { where: { id } }
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
        const bannerDetails = await GalleryModel.create(data);
        console.log(bannerDetails)
  
        if (image && imageExt) {
          const imageName = await imageUpload(dir, image, imageExt);
          await GalleryModel.update(
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
        errorNode: { errorCode: 1, errorMsg: error.message },
      });
    }
  };