import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, query, where, addDoc, updateDoc, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDG4JKKaDi1B_taRvD7kDygbq1xUddynqc",
    authDomain: "lightphone-bible.firebaseapp.com",
    projectId: "lightphone-bible",
    storageBucket: "lightphone-bible.appspot.com",
    messagingSenderId: "140705150740",
    appId: "1:140705150740:web:1e441ff6edbf6552a13401",
    measurementId: "G-9VQV2813RY"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

document.addEventListener("DOMContentLoaded", function ()  {
  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", async function () {
    const userInput = document.getElementById("input-bar").value.toLowerCase();

    const match = userInput.match(/(\w+) (\d+):(\d+)/);
    if (match) {
      const book = match[1]; // E.g., "Genesis"
      const chapter = match[2]; // E.g., "1"
      const verse = match[3]; // E.g., "1"
      console.log(typeof(chapter), chapter);
      const documentID = `${book}${chapter}`
      console.log(documentID)
      const docRef = doc(firestore, book, documentID)

      
      getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const chapterData = docSnap.data();
          console.log(chapterData[verse]);
        } else {
          console.log('Document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
    }

  });
})