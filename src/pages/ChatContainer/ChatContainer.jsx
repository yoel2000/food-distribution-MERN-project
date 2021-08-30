import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "../Chat/Chat";
function ChatContainer() {

    const [socket,setSocket] = useState(null)
  
return (<Chat socket={socket} ></Chat>)
}

export default ChatContainer