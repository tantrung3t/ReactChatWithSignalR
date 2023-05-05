import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { JoinRoom } from './components/JoinRoom'
import { HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Messages = {
  id: string,
  user: string,
  message: string
}

function App() {
  const [connection, setConnection] = useState<any>();
  const [messages, setMessages] = useState<Messages[]>([]);

  const joinRoom = async (user: string, room: string) => {
    console.log(`${user} ${room}`)
    try{
      const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7175/chathub")
      .configureLogging(LogLevel.Information)
      .build();

      connection.on("ReceiveMessage", (message, user) => {
        const data = {
          id: uuidv4(),
          user: user,
          message: message
        }
        setMessages([...messages, data])
      })

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
    }catch (e){
      console.log(e)
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <JoinRoom joinRoom={joinRoom}/>
      </div>
    </>
  )
}

export default App
