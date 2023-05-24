import isUrl from 'is-url';
import { checkExtension } from './controller.js';

import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Import the functions you need from the SDKs you need

import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8bm0bRgip4G1e3zMu9w6O5Mgb97493Ng',
  authDomain: 'releason.firebaseapp.com',
  projectId: 'releason',
  storageBucket: 'releason.appspot.com',
  messagingSenderId: '863519135834',
  appId: '1:863519135834:web:4c8bfb065f8e8e02676063',
  measurementId: 'G-C17D10WLQ2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const extensionId = 'ddinpkkkgfdlbaehdbiapkcoidacmipd';

var hasExtension = false;

export const state = {
  users: [],
  user: [],
};

const createNewUser = function (data) {
  const email = data[0];
  const pass = data[1];

  return {
    email: email,
    password: pass,
  };
};

// const setUrls = function () {
//   localStorage.setItem('urls', JSON.stringify(state.users.urls));
// };

export const getStuff = async function (url) {
  const res = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(`${url}`)}`
  );
  const data = await res.json();
  const str = data.contents;

  const doc = document.implementation.createHTMLDocument('');
  doc.open();
  doc.write(`${str}`);
  doc.close();
  return { url, doc };
};

// export const runCheck = function () {
//   chrome.runtime.sendMessage(
//     extensionId,
//     { message: 'version' },
//     function (reply) {
//       console.log(reply);
//       if (reply) {
//         if (reply.version) {
//           if (reply.version >= 1) {
//             hasExtension = true;
//             checkExtension(hasExtension);
//           }
//         }
//       } else {
//         hasExtension = false;
//         checkExtension(hasExtension);
//       }
//     }
//   );
// };

export const getAllURLS = async function () {
  const querySnapshot = await getDocs(collection(db, 'logins'));

  const accs = [];

  querySnapshot.forEach(doc => {
    const acc = { email: doc.data().email, urls: doc.data().urls };
    accs.push(acc);
  });
  return accs;
};

export const setNames = async function (name, id) {
  await updateDoc(doc(db, 'logins', `${id}`), {
    names: arrayUnion(name),
  });
};

export const setLoginInfo = async function (data) {
  try {
    const docRef = await addDoc(collection(db, 'logins'), {
      email: data.email,
      password: data.psw,
    });
    console.log('Document written with id:', docRef.id);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const getNewLoginInfo = async function () {
  const querySnapshot = await getDocs(collection(db, 'logins'));

  querySnapshot.forEach(doc => {
    state.users.push(doc.data());
  });
};
export const getLoginInfo = async function () {
  const querySnapshot = await getDocs(collection(db, 'logins'));
  const data = [];
  querySnapshot.forEach(doc => {
    data.push([doc.data(), doc.id]);
  });
  return data;
};

export const checkURL = async function (url, id) {
  if (isUrl(String(url))) {
    console.log('yet');
    await updateDoc(doc(db, 'logins', `${id}`), {
      urls: arrayUnion(url),
    });
    console.log('still');
    const something = await getDoc(doc(db, 'logins', `${id}`));

    const urls = something.data().urls;

    chrome.runtime.sendMessage(extensionId, urls);
  }

  return isUrl(String(url));
};

export const getUrls = async function (id) {
  const something = await getDoc(doc(db, 'logins', `${id}`));

  const urls = something.data().urls;

  return urls;
};

export const trackURLs = function (url) {
  console.log(state.urls);
};

// export const addName = async function (name) {
//   const loginRef = doc(db, 'logins');

//   await updateDoc(loginRef, {
//     names: name,
//   });
//   // setNames();
// };

// export const getURLs = function () {
//   const urls = localStorage.getItem('urls');
//   return JSON.parse(urls);
// };

export const getNames = async function (id) {
  const somethin = await getDoc(doc(db, 'logins', `${id}`));
  const names = somethin.data().names;

  return names;
};

export const addNewUser = function (data) {
  const newUser = createNewUser(data);
  state.users.push(newUser);
  setLoginInfo(data);
};

export const getId = async function (data) {
  const savedData = await getLoginInfo();

  const email = savedData.findIndex(
    user =>
      String(user[0].email).toLocaleLowerCase() ===
      String(data.email).toLocaleLowerCase()
  );

  const user = savedData[email];
  const id = user[1];
  return id;
};

export const checkLogin = async function (data) {
  const savedData = await getLoginInfo();

  const email = savedData.findIndex(
    user =>
      String(user[0].email).toLocaleLowerCase() ===
      String(data.email).toLocaleLowerCase()
  );

  const oneMore = savedData[email];
  const psw = oneMore[0].password;

  if (email === -1) {
    return false;
  }

  if (psw === data.password) {
    return true;
  } else {
    return false;
  }
};
