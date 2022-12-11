import { config, uploader } from "cloudinary";
var dataurl;
const cloudinaryConfig = async (locaFilePath) => {
  console.log("abc");
  config({
    cloud_name: "dolqf9s3y",
    api_key: "946358445313778",
    api_secret: "vic0vSFgD7_Z7-viUc49VzfHN30",
  });
  return uploader
    .upload(locaFilePath)
    .then((result) => {
      const image = result;
      console.log("cloud");
      console.log(image);
      return image;
    })
    .catch((err) => {
      console.log(err);
      // res.status(400).json({
      // messge: 'someting went wrong while processing your request',
      // data: {
      // err
      // }
      // });
      return null;
    });
};
export { dataurl, cloudinaryConfig };
