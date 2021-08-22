import { Button } from "react-bootstrap"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const axios = require('axios')

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


function DailyDistribution() {

    let [productList, setProductList] = useState([])
    let [formVisibility, setFormVisibility] = useState(false)
    const [selectedId, setSelectedId] = useState(-1);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const classes = useStyles();

    const handleListItemClick = (event, index, id) => {
        setSelectedIndex(index);
        setSelectedId(id);
    };

    let openAddingForm = () => {
        setFormVisibility(true)
    }

    useEffect(() => {
        axios.get("http://localhost:8080/products").then(x => setProductList(x.data))
    }, [selectedId])

    let addProduct = (event, obj) => {
        event.preventDefault()
        setProductList([...productList, obj])
        console.log(productList)
        axios.post("http://localhost:8080/addProduct", {
            'name': obj.name,
            'date': obj.date,
        }).then((res) => {
            console.log(res.data);
        })
    }

    return(
        <div className="container">
            <div>
            <input type="button" onClick={openAddingForm} value="+" />
            {formVisibility ? <AddForm addProduct={addProduct} productList={productList} /> : null}
            </div>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {productList.map((x, index) =>
                    (<ListItem button selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index, x.id)} key={index}>
                                  <ListItemText primary={x.name} />
                    </ListItem>)
                    )}
                </List>
            </div>

        </div>
    )
}


function AddForm(props) {
    let [name, setName] = useState('')
    let [date, setDate] = useState('')

    return (
        <div>
            <form onSubmit={(e) => props.addProduct(e, {name:name, date:date })}>
                Name of a product:
                <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} /> <br />
                Date:
                <input type="text" placeholder="TODO" onChange={(event) => setDate(event.target.value)} /> <br />
                <Button type="submit"> Add product</Button>
            </form>


        </div>
    )
}

export default DailyDistribution