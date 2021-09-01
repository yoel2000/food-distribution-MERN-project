import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useState } from "react";
import ListItemText from '@material-ui/core/ListItemText';
import { useEffect } from "react";
import Address from "./Address";
import SplitPane, { Pane } from 'react-split-pane';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import "./Dashboard.css"


function Dashboard(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedId, setSelectedId] = useState(-1);
    const [values, setValues] = useState([])
    const [personnalAddress, setPersonnalAddress] = useState([])
    let [formVisibility, setFormVisibility] = useState(false);

    const handleListItemClick = (event, index, id, values) => {
        setSelectedIndex(index);
        setSelectedId(id);
    };


    let openAddingForm = () => {
        setFormVisibility(true)
    }

    useEffect(() => {
        props.location.state.map((d) => {
            console.log(Object.values(d)[1])
            setValues((values) => [...new Set([...values, Object.values(d)[1]])])
        })
       }, []);


    useEffect(() => {

        let list = [];
        props.location.state.map((p) => {
            // console.log(Object.values(p))
            // console.log(values)
            // console.log(index);
            if (Object.values(p)[1] === values[selectedIndex]) {
                // console.log(Object.values(p)[0]);
                // setPersonnalAddress((personnalAddress) => [...personnalAddress, Object.values(p)[0]])
                list.push(Object.values(p)[0])
            }
            setPersonnalAddress(list);
        });
        console.log(personnalAddress)
    }, [selectedIndex])


    // console.log(values)
    // console.log(props.location.state)
    // console.log(Object.values(props.location.state[0])[1])

    return(
        <div className="container">
            <div className={classes.root}>
            <div class="split left">
                <List component="nav" aria-label="main mailbox folders">
                    {values.map((d, index) => (
                    (<ListItem button selected={selectedIndex === index}
                        onClick={(event) => {
                            handleListItemClick(event, index, selectedId, values)
                            openAddingForm()
                        }}
                        key={index}>
                    <ListItemText primary={d} />
                    </ListItem>)
                    ))}
                </List>
            </div>
                <div class="split right">
                <List component="nav" aria-label="main mailbox folders">
                    {personnalAddress.map((a, index) => (
                    (<ListItem button selected={selectedIndex === index}
                        onClick={(event) => {
                            handleListItemClick(event, index, selectedId, values)
                            openAddingForm()
                        }}
                        key={index}>
                    <ListItemText primary={a} />
                    </ListItem>)
                    ))}
                    </List>
                </div>
            </div>
            <div>

            {formVisibility ? <Address state={props.location.state} selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex} setSelectedId={setSelectedId} selectedId={selectedId} values={values}/> : null}
            </div>
        </div>
    )
}

export default Dashboard
