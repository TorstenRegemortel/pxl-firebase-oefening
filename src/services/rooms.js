import { firestore } from './firebase';

const rooms = firestore.collection('rooms');

export const addRoom = async data => {
  try {
    const ref = await rooms.add(data);
    return {
      data,
      id: ref.id
    };
  } catch (err) {
    return err.code;
  }
};

export const loadRooms = async () => {
  try {
    const ref = await rooms.orderBy('lastMessageOn').get();
    return ref.docs.map(r => ({ id: r.id, data: r.data() }));
  } catch (err) {
    return err.code;
  }
};

export const updateRoom = async (id, data, allData) => {
  try {
    await rooms.doc(id).update(data);
    return {
      data: {
        ...allData,
        ...data
      },
      id
    };
  } catch (err) {
    return err.code;
  }
};

export const deleteRoom = async id => {
  try {
    await rooms.doc(id).delete();
    return true;
  } catch (err) {
    return false;
  }
};
