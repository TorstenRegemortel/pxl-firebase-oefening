import { storage } from './firebase';

export const uploadFile = async (file, path) => {
  try {
    // sla de file op onder het gegeven pad en maak er een download url van.
    /*  return {
      ref: path,
      url: downloadUrl
    }; */
  } catch (err) {
    console.log(err);
    return err.code;
  }
};
