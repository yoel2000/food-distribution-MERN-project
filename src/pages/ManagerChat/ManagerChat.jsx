import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import VerticalTabs from "../VerticalTabs";

export function ManagerChat() {

    const [users, setUsers] = useState([])
    const [messages,setMessages]= useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/users').then(res => setUsers(res.data))
        axios.post('http://localhost:8080/myMessages', { from: JSON.parse(sessionStorage.getItem('cur_user'))?._id }).then(res => {
            setMessages(messages => [...res.data])
        })
    }, [])
    let otherUsers=()=>{
        return users.filter(x => x._id != JSON.parse(sessionStorage.getItem("cur_user"))._id);
    }

    let sortedMessages=()=>{
        let messagesList=[...messages];
        let usersList=[...users];
        let sorted={};
        usersList.forEach(x=>{
            sorted[x._id]=[];
        })
        let myId= JSON.parse(sessionStorage.getItem('cur_user'))?._id;
        messagesList.forEach(x=> {
            let contactId=""; 
            if (x.from != myId)
            contactId= x.from;
            else
            contactId=x.to;
            //check that the id exist (maybe the message is from a user that has since deleted)
            if (contactId in sorted) {
            sorted[contactId].push(x)
            }
        })
        return sorted;
    }

    return (<VerticalTabs sortedMessages={sortedMessages()} users={otherUsers()}></VerticalTabs>)
}

