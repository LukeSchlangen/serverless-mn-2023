"use client"

import { useState } from 'react';

type Message = {
  userName: string,
  text: string,
}

export default function Home() {
  const [displayName, setDisplayName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageFeed, setMessageFeed] = useState<Message[]>([]);
  const sendMessage = () => {
    const newMessage = {
      userName: displayName,
      text: messageText,
    };
    setMessageFeed([...messageFeed, newMessage]);
  }
  return (
    <main>
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
    </main>
  )
}
