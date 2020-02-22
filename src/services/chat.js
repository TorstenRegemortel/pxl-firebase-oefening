import { database } from './firebase';

export const sendMessage = async (roomId, message, senderId, username) => {
  try {
    database.ref(`${roomId}/${new Date().getTime()}`).set({
      message,
      senderId,
      username
    });
  } catch (err) {
    console.log(err);
  }
};

export const listenOnChat = (roomId, cb) =>
  database
    .ref(roomId)
    .orderByKey()
    .limitToLast(100)
    .on('child_added', cb);

export const readNext = async (roomId, last) => {
  try {
    const snap = await database
      .ref(roomId)
      .orderByKey()
      .endAt(last)
      .limitToLast(100)
      .once('value');
    const messages = snap.val();
    return Object.keys(messages).map(k => ({ id: k, ...messages[k] }));
  } catch (err) {
    console.error(err);
  }
};

export const removeListener = (roomId, listener) => {
  database
    .ref(roomId)
    .orderByKey()
    .limitToLast(100)
    .off('child_added', listener);
};
