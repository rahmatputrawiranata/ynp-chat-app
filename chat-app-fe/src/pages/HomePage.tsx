import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils";

function HomePage() {

    const [chatData, setChatData] = useState<{username: string; type: string; message: string; date: Date}[]>([])
    const [textMessage, setTextMessage] = useState<string>('')
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(socket.connected);

    const handleLogout = () => {
        // remove token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // redirect to login page
        navigate('/auth')
    }
    


    useEffect(() => {
      function onConnect() {
        setIsConnected(true);
      }
  
      function onDisconnect() {
        setIsConnected(false);
      }
  
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      };
  
    }, [])

    useEffect(() => {
      socket.on('message', (data: {username: string; message: string}) => {
        console.log(data)
      })
    }, [socket])

    const handleSend = () => {
      if(textMessage === '') return
      socket.emit('message', {
        username: localStorage.getItem('username'),
        message: textMessage
      })
      setTextMessage('')
    }
    

    return (
      <div className="bg-stone-300 h-screen xl:p-4 flex justify-center">
        <div className="bg-white rounded focus:outline-none focus:shadow-outline w-full max-w-7xl h-full flex  flex-col">
          {/* Header */}
          <div className="flex justify-between p-4 border-b-2">
            <div className="text-2xl font-bold">Holla {localStorage.getItem('username')}</div>
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Logout
              </button>
          </div>
          {/* Content */}
          <div className="flex flex-col overflow-hidden h-full">
            {/* Chat */}
            <div className="flex flex-col-reverse overflow-y-auto  p-4 h-full">
              {chatData
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'sender' ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className={`bg-blue-200 p-2 rounded ${chat.type === 'sender' ? 'ml-2' : 'mr-2'}`}>
                    {
                      chat.type === 'receiver' && 
                      <div className="text-xs mb-2 text-gray-600">{chat.username}</div>
                    }
                    {chat.message}
                    <div className="text-xs text-right text-gray-600">{chat.date.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Input Text */}
            <div className="flex justify-between p-4 border-t-2">
              <input type="text" value={textMessage} onChange={e => setTextMessage(e.target.value)} className="border-2 border-gray-300 rounded p-2 w-full" />
              <button disabled={false} onClick={handleSend} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send
              </button>
            </div>
          </div>
          
        </div>
      </div>
    );
}

export default HomePage;