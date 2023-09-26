"use client"

import { useEffect, useState } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXx1ljgI1GjA1tGQS1KlZg8L7LoNV5ipU",
  authDomain: "serverless-mn-2023.firebaseapp.com",
  projectId: "serverless-mn-2023",
  storageBucket: "serverless-mn-2023.appspot.com",
  messagingSenderId: "529906612942",
  appId: "1:529906612942:web:1809b79b02e62b61b4ee9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

type Message = {
  userName: string,
  text: string,
}

export default function Home() {
  const [user, setUser] = useState<User>();
  const [displayName, setDisplayName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageFeed, setMessageFeed] = useState<Message[]>([]);
  const sendMessage = () => {
    const newMessage = {
      userName: displayName,
      text: messageText,
      time: serverTimestamp(),
    };

    addDoc(collection(db, "messages"), newMessage);
  }

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy('time'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessageFeed(querySnapshot.docs.map((doc) => {
        return {
          userName: doc.data().userName,
          text: doc.data().text,
          id: doc.id,
        }
      }));
    })
    return () => unsubscribe();
  }, [])

  const signIn = async () => {
    const response = await signInWithPopup(auth, provider);
    setUser(response.user)
  }

  return (
    <main>
      {user ? <>
        <h1>Serverless MN</h1>
        <input onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
        <input onChange={(e) => setMessageText(e.target.value)} value={messageText} />
        <button onClick={sendMessage}>Send Message</button>
        <ul>
          {messageFeed.map((message) => (<li key={message.text}>
            {message.userName}: {message.text}
          </li>))}
        </ul>
        <p>Monkey Capybara Flour Flower</p>
      </> : <>
        <button onClick={signIn}>Sign In</button>
      </>}
    </main>
  )
}
