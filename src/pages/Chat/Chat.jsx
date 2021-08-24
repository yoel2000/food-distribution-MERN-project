//import io from "socket.io-client";
import axios from 'axios'
import { to_Decrypt, to_Encrypt } from "../../aes.js";
//import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { clippingParents } from "@popperjs/core";

//import "./chat.scss";

//import { useDispatch } from "react-redux";

//gets the data from the action object and reducers defined earlier
function Chat({socket}) {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    //const socket = io.connect('http://localhost:8080');


    let addMessages = (message) => {
        setMessages(messages=>[...messages, message])
    }

    useEffect(() => {
        socket?.on("disconnect", () => {
            alert(
                "disconnect"
            )
            socket?.connect();
        });
        socket?.on("message", addMessages)
    }, [socket])

    let getMessages = () => {
        axios.get('http://localhost:8080/messages', (res) => {
            setMessages([...res.data])
        })
    }

    let sendMessage = () => {
        axios.post('http://localhost:8080/messages', { from: "", to: "", text: text })
    }

    return (
        <div>
            your message: <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <input type="button" value="send" onClick={sendMessage} />
            last messages: <ul>{messages.map((x, key) => <li key={key}>{x.text}</li>)}</ul>
        </div>

    )


    //const dispatch = useDispatch();

    //   const dispatchProcess = (encrypt, msg, cipher) => {
    //     dispatch(process(encrypt, msg, cipher));
    //   };

    //   useEffect(() => {
    //     socket.on("message", (data) => {
    //       //decypt the message
    //       const ans = to_Decrypt(data.text, data.username);
    //       dispatchProcess(false, ans, data.text);
    //       console.log(ans);
    //       let temp = messages;
    //       temp.push({
    //         userId: data.userId,
    //         username: data.username,
    //         text: ans,
    //       });
    //       setMessages([...temp]);
    //     });
    //   }, [socket]);

    //   const sendData = () => {
    //     if (text !== "") {
    //       //encrypt the message here
    //       const ans = to_Encrypt(text);
    //       socket.emit("chat", ans);
    //       setText("");
    //     }
    //   };
    //   const messagesEndRef = useRef(null);

    //   const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    //   };

    //   useEffect(scrollToBottom, [messages]);

    //   console.log(messages, "mess");

    //   return (
    //     <div className="chat">
    //       <div className="user-name">
    //         <h2>
    //           {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
    //         </h2>
    //       </div>
    //       <div className="chat-message">
    //         {messages.map((i) => {
    //           if (i.username === username) {
    //             return (
    //               <div className="message">
    //                 <p>{i.text}</p>
    //                 <span>{i.username}</span>
    //               </div>
    //             );
    //           } else {
    //             return (
    //               <div className="message mess-right">
    //                 <p>{i.text} </p>
    //                 <span>{i.username}</span>
    //               </div>
    //             );
    //           }
    //         })}
    //         <div ref={messagesEndRef} />
    //       </div>
    //       <div className="send">
    //         <input
    //           placeholder="enter your message"
    //           value={text}
    //           onChange={(e) => setText(e.target.value)}
    //           onKeyPress={(e) => {
    //             if (e.key === "Enter") {
    //               sendData();
    //             }
    //           }}
    //         ></input>
    //         <button onClick={sendData}>Send</button>
    //       </div>
    //     </div>
    //   );


}
export default Chat;