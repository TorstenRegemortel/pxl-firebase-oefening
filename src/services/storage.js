import { storage } from './firebase';

export const uploadFile = async (file, path) => {
  try {
    const ref = await storage.ref(path).put(file);
    const downloadUrl = await ref.ref.getDownloadURL();
    return {
      ref: path,
      url: downloadUrl
    };
  } catch (err) {
    console.log(err);
    return err.code;
  }
};
