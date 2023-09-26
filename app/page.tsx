"use client"

import { useState } from 'react';

export default function Home() {
  const [displayName, setDisplayName] = useState('');
  const [messageText, setMessageText] = useState('');
  const sendMessage = () => {
    const newMessage = {
      userName: displayName,
      text: messageText,
    };
    console.log(newMessage);
  }
  return (
    <main>
      <h1>Serverless MN</h1>
      <input onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
      <input onChange={(e) => setMessageText(e.target.value)} value={messageText} />
      <button onClick={sendMessage}>Send Message</button>

      <p>Monkey Capybara Flour Flower</p>
    </main>
  )
}
