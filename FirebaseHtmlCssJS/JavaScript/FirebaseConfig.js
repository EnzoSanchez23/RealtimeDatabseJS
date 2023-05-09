import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyCCK05yar8RBcc2vePyy0TMmmoJf54Mdjw",
    authDomain: "fir-htmlcssjs.firebaseapp.com",
    databaseURL: "https://fir-htmlcssjs-default-rtdb.firebaseio.com",
    projectId: "fir-htmlcssjs",
    storageBucket: "fir-htmlcssjs.appspot.com",
    messagingSenderId: "772197332474",
    appId: "1:772197332474:web:53ee0bc01dc14041fb2043",
    measurementId: "G-S46KVBLWQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);