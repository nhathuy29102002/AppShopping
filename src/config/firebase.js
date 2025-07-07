import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

/**
 * Config fireb
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDGqX1XEGrWDCmkXHht0bbgpETrldL9DTg',
  authDomain: 'shoppingapp-9cf5c.firebaseapp.com',
  databaseURL:
    'https://shoppingapp-9cf5c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'shoppingapp-9cf5c',
  storageBucket: 'shoppingapp-9cf5c.appspot.com',
  messagingSenderId: '150591590883',
  appId: '1:150591590883:web:19992590d4ff896a0210d6',
  measurementId: 'G-BBNR81B4QF',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

// export const analytics = getAnalytics(app);
