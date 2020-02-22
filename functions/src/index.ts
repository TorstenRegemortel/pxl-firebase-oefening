import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

const serviceAccount = require('../service.json');

const { env } = functions.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: env['storage-bucket'],
  databaseURL: env['database-url']
});

const funcs = functions.region('europe-west1');

exports.onRoomDelete = funcs.firestore
  .document('/rooms/{roomId}')
  .onDelete(async snap => {
    const id = snap.id;
    try {
      await admin
        .database()
        .ref(id)
        .remove();
      const fileExists = await admin
        .storage()
        .bucket()
        .file(`rooms/${id}/image`)
        .exists();
      if (fileExists) {
        await admin
          .storage()
          .bucket()
          .file(`rooms/${id}/image`)
          .delete();
      }
      console.info('deleted room with id', id);
    } catch (err) {
      console.error(err);
    }
  });
