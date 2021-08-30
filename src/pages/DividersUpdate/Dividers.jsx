import React from "react"
import { useState } from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Dividers(props) {


    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index, id) => {
        setSelectedIndex(index);
        props.setSelectedId(id);
    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {props.dividersList.map((x, index) =>
                (<ListItem button selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index, x.id)} key={index}>
                    <ListItemText primary={x.name} />
                </ListItem>)
                )}
            </List>
        </div>
    )

}

export default Dividers
