//Pa borrar.
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { initializeApp } from 'firebase/app';

//Mock data.
const mockData = [
  {
    token: '1',
    name: 'monica',
    items: [
      { name: 'yucca', lastPurch: new Date(), howSoon: 7 },
      { name: 'rice', lastPurch: new Date(), howSoon: 30 },
    ],
  },
  {
    token: '2',
    name: 'beatriz',
    items: [
      { name: 'bread', lastPurch: new Date(), howSoon: 14 },
      { name: 'pizza', lastPurch: new Date(), howSoon: 7 },
      { name: 'nuggets', lastPurch: new Date(), howSoon: 14 },
    ],
  },
  {
    token: '3',
    name: 'pacho',
    items: [
      { name: 'yoghurt', lastPurch: new Date(), howSoon: 30 },
      { name: 'milk', lastPurch: new Date(), howSoon: 14 },
      { name: 'ceviche', lastPurch: new Date(), howSoon: 7 },
    ],
  },
  {
    token: '4',
    name: 'jorge',
    items: [{ name: 'tomatoes', lastPurch: new Date(), howSoon: 14 }],
  },
  {
    token: '5',
    name: 'olga',
    items: [
      { name: 'pineapple', lastPurch: new Date(), howSoon: 14 },
      { name: 'sugar', lastPurch: new Date(), howSoon: 30 },
      { name: 'watermelon', lastPurch: new Date(), howSoon: 14 },
      { name: 'berries', lastPurch: new Date(), howSoon: 7 },
    ],
  },
  {
    token: '6',
    name: 'pía',
    items: [
      { name: 'cantaloupe', lastPurch: new Date(), howSoon: 7 },
      { name: 'vinegar', lastPurch: new Date(), howSoon: 14 },
    ],
  },
  {
    token: '7',
    name: 'johnatan',
    items: [
      { name: 'rice', lastPurch: new Date(), howSoon: 30 },
      { name: 'apples', lastPurch: new Date(), howSoon: 14 },
      { name: 'oil', lastPurch: new Date(), howSoon: 30 },
      { name: 'lettuce', lastPurch: new Date(), howSoon: 7 },
    ],
  },
  {
    token: '8',
    name: 'carlos',
    items: [
      { name: 'tomatoes', lastPurch: new Date(), howSoon: 14 },
      { name: 'nuggets', lastPurch: new Date(), howSoon: 14 },
      { name: 'rice', lastPurch: new Date(), howSoon: 30 },
    ],
  },
  {
    token: '9',
    name: 'david',
    items: [{ name: 'ceviche', lastPurch: new Date(), howSoon: 7 }],
  },
  {
    token: '10',
    name: 'camilo',
    items: [
      { name: 'sugar', lastPurch: new Date(), howSoon: 30 },
      { name: 'watermelon', lastPurch: new Date(), howSoon: 14 },
      { name: 'pizza', lastPurch: new Date(), howSoon: 7 },
    ],
  },
  {
    token: '11',
    name: 'kathy',
    items: [
      { name: 'milk', lastPurch: new Date(), howSoon: 14 },
      { name: 'ceviche', lastPurch: new Date(), howSoon: 7 },
      { name: 'pineapple', lastPurch: new Date(), howSoon: 14 },
      { name: 'vinegar', lastPurch: new Date(), howSoon: 14 },
    ],
  },
  {
    token: '12',
    name: 'eliana',
    items: [
      { name: 'nuggets', lastPurch: new Date(), howSoon: 14 },
      { name: 'rice', lastPurch: new Date(), howSoon: 30 },
      { name: 'yoghurt', lastPurch: new Date(), howSoon: 30 },
      { name: 'milk', lastPurch: new Date(), howSoon: 14 },
      { name: 'oil', lastPurch: new Date(), howSoon: 30 },
    ],
  },
  {
    token: '13',
    name: 'luis',
    items: [
      { name: 'watermelon', lastPurch: new Date(), howSoon: 14 },
      { name: 'pizza', lastPurch: new Date(), howSoon: 7 },
      { name: 'bread', lastPurch: new Date(), howSoon: 14 },
      { name: 'nuggets', lastPurch: new Date(), howSoon: 14 },
    ],
  },
  {
    token: '14',
    name: 'eliseo',
    items: [
      { name: 'apples', lastPurch: new Date(), howSoon: 14 },
      { name: 'oil', lastPurch: new Date(), howSoon: 30 },
      { name: 'cantaloupe', lastPurch: new Date(), howSoon: 7 },
      { name: 'tangerines', lastPurch: new Date(), howSoon: 7 },
    ],
  },
  {
    token: '15',
    name: 'félix',
    items: [
      { name: 'pineapple', lastPurch: new Date(), howSoon: 14 },
      { name: 'vinegar', lastPurch: new Date(), howSoon: 14 },
    ],
  },
  {
    token: '16',
    name: 'augusto',
    items: [{ name: 'peppers', lastPurch: new Date(), howSoon: 7 }],
  },
];

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyDk62AqcY0yUiDoJA6dsapBiVfMmrerVwM',
  authDomain: 'tcl-39-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-39-smart-shopping-list',
  storageBucket: 'tcl-39-smart-shopping-list.appspot.com',
  messagingSenderId: '276515233393',
  appId: '1:276515233393:web:31fb41dbda6005b518c5d0',
};

initializeApp(firebaseConfig);
const db = getFirestore();

export const colRef = collection(db, 'lists');

const getIDs = async () => {
  const ids = [];
  const docs = await getDocs(colRef);
  docs.forEach((doc) => {
    ids.push(doc.id);
  });
  return ids;
};

const deleteByID = async (id) => {
  const docRef = doc(colRef, id);
  await deleteDoc(docRef);
};

export const superPopulate = async () => {
  const ids = await getIDs();
  ids.forEach((id) => {
    deleteByID(id);
  });
  populateDB();
  console.log('Done with DB!');
};

const createList = async (item) => {
  const { name, items } = item;
  try {
    await setDoc(doc(colRef, getToken(words)), {
      name,
      items,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

const populateDB = async () => {
  mockData.forEach((item) => {
    createList(item);
  });
};
console.log('I run');
