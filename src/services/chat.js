import { database } from './firebase';

export const sendMessage = async (roomId, message, senderId, username) => {
  // 3.1 voeg een nieuw chatbericht toe aan de gegeven roomId. de id van het bericht is
  // de timestamp van dit moment namelijk:
  // new Date().getTime()
};

export const listenOnChat = (roomId, cb) => {
  // 3.2 maak een listener aan voor de chatberichten in de gegeven room.
  // gesorteerd
  // limiteer het aantal opgehaalde berichten op 100.
  // return waarde is de query die je schrijft.
  //cb is de callback.
}

export const readNext = async (roomId, last) => {
  try {
    // 3.3 Haal de laatste 100 berichten op eindigend met "last" en gesorteerd.
    // de query mag maar 1 keer uitgevoerd worden.
    // return is hieronder gegeven.
    // return Object.keys(messages).map(k => ({ id: k, ...messages[k] }));
  } catch (err) {
    console.error(err);
  }
};

export const removeListener = (roomId, listener) => {
  // 3.4 zorg er voor dat de listener gestopt wordt als deze functie opgeroepen wordt.
};
