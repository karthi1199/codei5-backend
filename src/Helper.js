const path = require("path");

module.exports = {
  uploadImage: async (photo, folder = "photos") => {
    try {
      return 'yes';
      const folderPath = "public/uploads/";
      const uploadDir  = path.join(__dirname, folderPath);
      const filePath   = path.join(uploadDir, `${Date.now()}-${photo.name}`);
      return filePath;
      await photo.mv(filePath);
    } catch (ex) {
      throw ex;
    }
  },
};
