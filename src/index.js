import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './firebase';
// import { firestore } from './firebase';

// export const FirestoreContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <FirestoreContext.Provider value={firestore}>
    <App />
  // </FirestoreContext.Provider>
);
