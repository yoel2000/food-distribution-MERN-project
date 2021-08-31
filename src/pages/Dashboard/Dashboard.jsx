import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useState } from "react";
import ListItemText from '@material-ui/core/ListItemText';
import { useEffect } from "react";


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
    let [formVisibility, setFormVisibility] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const [uniqueTag, setUniqueTag] = useState([])
    const [values, setValues] = useState([])
    let [uneFois, setUneFois] = useState(false)

    const handleListItemClick = (event, index, id, d) => {
        setSelectedIndex(index);
        setSelectedId(id);
        // setUniqueTag((uniqueTag) => [...uniqueTag, d.name])
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



    console.log(values)
    console.log(props.location.state)
    console.log(Object.values(props.location.state[0])[1])

    return(
        <div className="container">
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {values.map((d, index) => (
                    (<ListItem button selected={selectedIndex === index} onClick={(event) =>
                        handleListItemClick(event, index, selectedId, d)} key={index}>
                    <ListItemText primary={d} />
                    </ListItem>)
                    ))}
                </List>
            </div>
            {/*<div>
            {formVisibility ? <AddForm addProduct={addProduct} productList={productList} /> : null}
            </div>*/}
        </div>
    )
}

export default Dashboard
