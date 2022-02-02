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
import { format } from 'date-fns';

function randomDate() {
  const start = new Date(2022, 0, 31);
  const end = new Date();

  var date = new Date(+start + Math.random() * (end - start));

  return date;
}

//Mock data.
const mockData = [
  {
    token: '1',
    name: 'monica',
    items: [
      { name: 'yucca', lastPurch: randomDate(), howSoon: 7 },
      { name: 'rice', lastPurch: randomDate(), howSoon: 30 },
    ],
  },
  {
    token: '2',
    name: 'beatriz',
    items: [
      { name: 'bread', lastPurch: randomDate(), howSoon: 14 },
      { name: 'pizza', lastPurch: randomDate(), howSoon: 7 },
      { name: 'nuggets', lastPurch: randomDate(), howSoon: 14 },
    ],
  },
  {
    token: '3',
    name: 'pacho',
    items: [
      { name: 'yoghurt', lastPurch: randomDate(), howSoon: 30 },
      { name: 'milk', lastPurch: randomDate(), howSoon: 14 },
      { name: 'ceviche', lastPurch: randomDate(), howSoon: 7 },
    ],
  },
  {
    token: '4',
    name: 'jorge',
    items: [{ name: 'tomatoes', lastPurch: randomDate(), howSoon: 14 }],
  },
  {
    token: '5',
    name: 'olga',
    items: [
      { name: 'pineapple', lastPurch: randomDate(), howSoon: 14 },
      { name: 'sugar', lastPurch: randomDate(), howSoon: 30 },
      { name: 'watermelon', lastPurch: randomDate(), howSoon: 14 },
      { name: 'berries', lastPurch: randomDate(), howSoon: 7 },
    ],
  },
  {
    token: '6',
    name: 'pía',
    items: [
      { name: 'cantaloupe', lastPurch: randomDate(), howSoon: 7 },
      { name: 'vinegar', lastPurch: randomDate(), howSoon: 14 },
    ],
  },
  {
    token: '7',
    name: 'johnatan',
    items: [
      { name: 'rice', lastPurch: randomDate(), howSoon: 30 },
      { name: 'apples', lastPurch: randomDate(), howSoon: 14 },
      { name: 'oil', lastPurch: randomDate(), howSoon: 30 },
      { name: 'lettuce', lastPurch: randomDate(), howSoon: 7 },
    ],
  },
  {
    token: '8',
    name: 'carlos',
    items: [
      { name: 'tomatoes', lastPurch: randomDate(), howSoon: 14 },
      { name: 'nuggets', lastPurch: randomDate(), howSoon: 14 },
      { name: 'rice', lastPurch: randomDate(), howSoon: 30 },
    ],
  },
  {
    token: '9',
    name: 'david',
    items: [{ name: 'ceviche', lastPurch: randomDate(), howSoon: 7 }],
  },
  {
    token: '10',
    name: 'camilo',
    items: [
      { name: 'sugar', lastPurch: randomDate(), howSoon: 30 },
      { name: 'watermelon', lastPurch: randomDate(), howSoon: 14 },
      { name: 'pizza', lastPurch: randomDate(), howSoon: 7 },
    ],
  },
  {
    token: '11',
    name: 'kathy',
    items: [
      { name: 'milk', lastPurch: randomDate(), howSoon: 14 },
      { name: 'ceviche', lastPurch: randomDate(), howSoon: 7 },
      { name: 'pineapple', lastPurch: randomDate(), howSoon: 14 },
      { name: 'vinegar', lastPurch: randomDate(), howSoon: 14 },
    ],
  },
  {
    token: '12',
    name: 'eliana',
    items: [
      { name: 'nuggets', lastPurch: randomDate(), howSoon: 14 },
      { name: 'rice', lastPurch: randomDate(), howSoon: 30 },
      { name: 'yoghurt', lastPurch: randomDate(), howSoon: 30 },
      { name: 'milk', lastPurch: randomDate(), howSoon: 14 },
      { name: 'oil', lastPurch: randomDate(), howSoon: 30 },
    ],
  },
  {
    token: '13',
    name: 'luis',
    items: [
      { name: 'watermelon', lastPurch: randomDate(), howSoon: 14 },
      { name: 'pizza', lastPurch: randomDate(), howSoon: 7 },
      { name: 'bread', lastPurch: randomDate(), howSoon: 14 },
      { name: 'nuggets', lastPurch: randomDate(), howSoon: 14 },
    ],
  },
  {
    token: '14',
    name: 'eliseo',
    items: [
      { name: 'apples', lastPurch: randomDate(), howSoon: 14 },
      { name: 'oil', lastPurch: randomDate(), howSoon: 30 },
      { name: 'cantaloupe', lastPurch: randomDate(), howSoon: 7 },
      { name: 'tangerines', lastPurch: randomDate(), howSoon: 7 },
    ],
  },
  {
    token: '15',
    name: 'félix',
    items: [
      { name: 'pineapple', lastPurch: randomDate(), howSoon: 14 },
      { name: 'vinegar', lastPurch: randomDate(), howSoon: 14 },
    ],
  },
  {
    token: '16',
    name: 'augusto',
    items: [{ name: 'peppers', lastPurch: randomDate(), howSoon: 7 }],
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
