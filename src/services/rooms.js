import { firestore } from './firebase';

// 2.1 maak hier al een referentie naar de "rooms" collectie aan.

export const addRoom = async data => {
  // 2.2 gebruik de bovenstaande rooms reference om een room toe te voegen.
  // return: object:{ data, id } of  error code: string
};

export const loadRooms = async () => {
  // 2.3 haal alle rooms gesorteerd op.
  // return: array van:{ data, id } of  error code: string
};

export const updateRoom = async (id, data, allData) => {
  try {
    // 2.4 update rpoom met id "id" met "data".
    // onderstaande return is gegeven.
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
  // 2.5 verwijder room met id: "id". Geef true terug als de delete slaagt en false als deze faalt
};
