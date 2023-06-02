const Op = require("sequelize").Op;
const path = require('path');
const slugify = require("../../helpers/slugify");
const MasterModel = require("../../models/master_catagory.model");
const imageUpload = require("../../helpers/image.upload");

exports.masterList = async (req, res) => {
    try {
      const bannerList = await MasterModel.findAll();
  
      const resultArray = await Promise.all(
        bannerList.map(async (post) => {
          const image = post.image
            ? `${req.app.locals.baseurl}/uploads/banners/${post.image}`
            : null;
  
          return {
            id:post.id,
            title: post.title,
            slug: post.slug,
            logo: post.logo,
            small_descption: post.small_descption,
            status: post.status,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            // image: image,
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

//   exports.masterCreate = async (req, res) => {
//     const id = req?.body?.id || null;
//     const title = req?.body?.title || null;
//     const small_descption = req?.body?.small_descption || null;
//     const status = req?.body?.status || null;
//     const createdAt = req?.body?.createdAt || null;
//     const updatedAt = req?.body?.updatedAt || null;
//     const logo = req?.body?.logo || null;
//     const logoExt = req?.body?.logoExt || null;
//     let slug = await slugify(title);

//     const dir = "./public/uploads/banners";

//     const slugCount = await MasterModel.count({ where: { slug: slug } });
//     if (slugCount) slug = `${slug}${slugCount}`;

//     try {
//         const data = {
//             id, title,small_descption,status,createdAt,updatedAt,logo
//         }
//         if(id) {
//             await MasterModel.update(data,{ where:{id:id}});
//             if (logo && logoExt) {
//                 const logoName = await imageUpload(dir, logo, logoExt);
//                 await MasterModel.update(
//                   {
//                     logo: logoName,
//                   },
//                   { where: { id: id } }
//                 );
//               }
//               return res.status(200).send({
//                 data: {
//                   success: true,
//                   message: "Successfully updated",
//                 },
//                 errorNode: { errorCode: 0, errorMsg: "No Error" },
//               });
//         } else {
//       const bannerDetails = await MasterModel.create(data);
//       if (logo && logoExt) {
//         const logoName = await imageUpload(dir, logo, logoExt);
//         await MasterModel.update(
//           {
//             logo: logoName,
//           },
//           { where: { id: bannerDetails.id } }
//         );
//       }
//       return res.status(201).send({
//         data: {
//           success: true,
//           message: "Successfully created",
//         },
//         errorNode: { errorCode: 0, errorMsg: "No Error" },
//       });
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

exports.masterCreate = async (req, res) => {
  try {
    const id = req?.body?.id || null;
    const title = req?.body?.title || null;
    const small_description = req?.body?.small_description || null;
    const status = req?.body?.status || null;
    const createdAt = req?.body?.createdAt || null;
    const updatedAt = req?.body?.updatedAt || null;
    const logo = req?.body?.logo || null;
    const logoExt = req?.body?.logoExt || null;

    const dir = "./public/uploads/banners";

    let slug = await slugify(title);
    const slugCount = await MasterModel.count({ where: { slug } });
    if (slugCount) slug = `${slug}${slugCount}`;

    const data = {
      title,
      slug,
      small_description,
      status,
      createdAt,
      updatedAt,
      logo,
    };

    if (id) {
      await MasterModel.update(data, { where: { id } });

      if (logo && logoExt) {
        const logoName = await imageUpload(dir, logo, logoExt);
        await MasterModel.update(
          {
            logo: logoName,
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
      const bannerDetails = await MasterModel.create(data);
      console.log(bannerDetails)

      if (logo && logoExt) {
        const logoName = await imageUpload(dir, logo, logoExt);
        await MasterModel.update(
          {
            logo: logoName,
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

exports.masterDetails = async (req, res) => {
  const { id } = req.body || {};

  if (!id) {
    return res.status(400).send({
      data: { success: false, message: 'id is required' },
      errorNode: { errorCode: 1, errorMsg: 'id is required' },
    });
  }

  try {
    const bannerDetails = await MasterModel.findOne({
      where: { id },
      attributes: ['id', 'title', 'slug', 'small_description',  'status', 'logo'],
    });

    if (!bannerDetails) {
      return res.status(404).send({
        data: { success: false, message: 'Banner not found' },
        errorNode: { errorCode: 1, errorMsg: 'Banner not found' },
      });
    }

    const imageUrl = bannerDetails.logo
      ? path.join(req.app.locals.baseurl, 'uploads', 'banners', bannerDetails.logo)
      : path.join(req.app.locals.baseurl, 'noimage.png');

    const responseData = {
      success: true,
      details: {
        ...bannerDetails.dataValues,
        logo: imageUrl,
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

exports.masterDelete = async (req, res) => {
  try {
    const id = req.body?.id || null;

    if (!id) {
      return res.status(400).send({
        data: { success: false, message: 'id is required' },
        errorNode: { errorCode: 1, errorMsg: 'id is required' },
      });
    }

    await MasterModel.destroy({ where: { id } });

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
