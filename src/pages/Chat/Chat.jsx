//import io from "socket.io-client";
import axios from 'axios'
import io from "socket.io-client";
import { to_Decrypt, to_Encrypt } from "../../aes.js";
//import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { clippingParents } from "@popperjs/core";
import { useContext } from 'react';
import { UserContext } from '../../UserContext.jsx';

//import "./chat.scss";

//gets the data from the action object and reducers defined earlier
function Chat({initialMessages ,toContact}) {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null)
    const [to, setTo] = useState();
    const [users, setUsers] = useState([])

    //const [user, setUser] = useContext(UserContext)

    //const socket = io.connect('http://localhost:8080');


    let addMessages = (message) => {
        getMessages();
        //setMessages(messages => [...messages, message])
    }

    useEffect(() => {
        axios.get('http://localhost:8080/users').then(res => setUsers(res.data))
        setMessages(initialMessages)
        setSocket(io.connect('http://localhost:8080'))
        setTo(toContact)
    }, [])
    
    useEffect(()=>{
        setMessages(initialMessages)
    },[initialMessages])

    useEffect(() => {
        //the mounted var is for this issue: https://www.debuggr.io/react-update-unmounted-component/
      //if (mounted){
      let list= users.filter(x=>{return x._id!=(JSON.parse(sessionStorage.getItem("cur_user"))._id)})
      let to_id=0;
      if (list.length)
        to_id= list[0]._id;

      //}
       // return ()=>mounted=false
    }, [users])



    useEffect(() => {
        if (socket) {
            socket.connect();
            socket.on("disconnect", () => {
                alert(
                    "disconnect"
                )
                socket.connect();
            });
            socket.on("connect", () => {
                console.log(socket.id)
            });
            socket.on("message", addMessages);

        }
    }, [socket])                

    let getMessages = () => {
        axios.post('http://localhost:8080/myMessages', { from: JSON.parse(sessionStorage.getItem('cur_user'))?._id ,to:to}).then(res => {
            setMessages(messages => [...res.data])
        })
    }

    let sendMessage = () => {
        let from_id = JSON.parse(sessionStorage.getItem('cur_user'))._id;
        axios.post('http://localhost:8080/messages', { from: from_id, to: to, text: text })
    }


    return (
        <div>
            message: <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <input type="button" value="send" onClick={sendMessage} /><br/>
            last messages: <ul>{messages?.map((x, key) => {
                if (x.from == JSON.parse(sessionStorage.getItem("cur_user"))._id) return (<li key={key}>you: {x.text}</li>); 
                else return (<li key={key}>{x.text}</li>)
            }
            )}
            </ul>
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