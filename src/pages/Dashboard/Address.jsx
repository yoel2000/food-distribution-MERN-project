import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useEffect } from "react";

function Address(props){
    /*console.log(props.state)
    console.log(props.selectedIndex)
    console.log(props.values)*/



    useEffect(() => {

       }, []);

    const handleListItemClick = (event, index, id) => {
        props.setSelectedIndex(index);
        props.setSelectedId(id);

    };

    return(
        <div>
            {/*props.state.filter((s) => s.address)*/}

        </div>
    )
}

export default Address