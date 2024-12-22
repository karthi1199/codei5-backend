const path = require("path");
const fs = require('fs').promises;

module.exports = {
  uploadImage: async (photo, folder = "photos") => {
    try {

      if (!photo) {
        return {status: false, message: 'No file uploaded'};
      }

      const random = Date.now() + '-' + Math.floor(Math.random() * 1000000);

      const filename = path.extname(photo.name) ? `${random}${path.extname(photo.name)}` : `${random}.jpg`;
      
      const folderPath = path.join('/tmp', folder);
      await fs.mkdir(folderPath, { recursive: true });

      const filePath = path.join(folderPath, filename);

      await photo.mv(filePath);
      
      return {status: true, name: filePath};
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
};
