import { Button } from "react-bootstrap"
import React, { useMemo } from "react"
import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import "./DividersUpdate.css";
import { useEffect } from "react";
import UpdateForm from "./UpdateForm";

const axios = require('axios')

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));




function DividersUpdate() {
    useEffect(() => {
        axios.get("http://localhost:8080/distributors").then(x => setDividersList(x.data))
    }, [])

    let [dividersList, setDividersList] = useState([])
    let [formVisibility, setFormVisibility] = useState(false)
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    let openAddingForm = () => {
        setFormVisibility(true)
    }

    let addDivider = (event, obj) => {
        event.preventDefault()
        setDividersList([...dividersList, obj])
        console.log(dividersList)
        axios.post("http://localhost:8080/addDistributor", {
            'email': obj.email,
            'name': obj.name,
            'telephone': obj.telephone
        }).then((res) => {
            console.log(res.data); console.log(res.data)
        })


    }


    return (
        <div className="container">
            <div>
            <input type="button" onClick={openAddingForm} value="+" />
            {formVisibility ? <AddForm addDivider={addDivider} dividersList={dividersList} /> : null}
            </div>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">

                    {dividersList.map((x, index) =>
                    (<ListItem button selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)} key={index}>
                                  <ListItemText primary={x.name} />
                    </ListItem>)
                    )}
                </List>
            </div>
            <UpdateForm dividersList={dividersList}/>



        </div>
    )
}


function AddForm(props) {
    let [telephone, setTelephone] = useState('')
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')

    return (
        <div>
            <form onSubmit={(e) => props.addDivider(e, { telephone: telephone, email: email, name: name })}>
                Telephone:
                <input type="text" placeholder="telephone" onChange={(event) => setTelephone(event.target.value)} /> <br />
                Name:
                <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} /> <br />
                Email:
                <input type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)} /> <br /> <br />
                <Button type="submit"> Add divider</Button>
            </form>


        </div>
    )
}

export default DividersUpdate