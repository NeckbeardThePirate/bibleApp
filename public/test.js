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

exports.handler = function (context, event, callback) {
  let twiml = new Twilio.twiml.MessagingResponse();
  const body = event.Body ? event.Body.toLowerCase() : null;

  // Extract the book, chapter, and verse from the user's input
  const match = body.match(/(\w+) (\d+):(\d+)/);
  if (match) {
      const book = match[1]; // E.g., "Genesis"
      const chapter = match[2]; // E.g., "1"
      const verse = match[3]; // E.g., "1"

      const documentID = `${book}${chapter}`
      console.log(documentID)
      const docRef = doc(firestore, book, documentID)

      
      getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const chapterData = docSnap.data();
          twiml.message(chapterData[verse]);
          } else {
            twiml.message(`Verse ${verse} not found.`);
          }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
        twiml.message('An error occurred.');
        callback(null, twiml);
      });
    } else {
    twiml.message('Invalid reference format. Please use "Book Chapter:Verse".');
    callback(null, twiml);
  }
}
