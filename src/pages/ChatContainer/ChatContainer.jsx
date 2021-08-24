import io from "socket.io-client";
import Chat from "../Chat/Chat";
function ChatContainer() {
    const socket = io.connect('http://localhost:8080');
return (<Chat socket={socket} ></Chat>)
}

export default ChatContainer