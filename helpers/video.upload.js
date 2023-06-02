const fs = require("fs");
const videoUpload = (dir, image, imageExt) => {
  let imageName = "";
  try {
    if (dir && image && imageExt) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const imageTitle = Date.now();
      const path = `${dir}/${imageTitle}.${imageExt}`;
      const normalImage = imageTitle + "." + imageExt;
	    let base64Data = '';
  	  if(image.includes("data:application/pdf;base64,")){
        base64Data = image.replace("data:application/pdf;base64,","");
      } else if(image.includes("data:video/mp4;base64,")){
        base64Data = image.replace("data:video/mp4;base64,","");
  	  } else {
        base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, "");
  	  }
      fs.writeFileSync(path, base64Data, { encoding: "base64" });
      imageName = normalImage;
    }
    return imageName;
  } catch (error) {
    console.log(error);
    return imageName;
  }
};
module.exports = videoUpload;