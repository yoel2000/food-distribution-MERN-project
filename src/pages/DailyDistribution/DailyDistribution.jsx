import { Button } from "react-bootstrap"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DatePicker from 'react-date-picker';
import UpdateDistribution from "./UpdateDistribution"

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
        obj.date = obj.date.toISOString().split('T')[0]

        setProductList((productList) => ([...productList, obj]))

        console.log(obj)
        axios.put("http://localhost:8080/addProduct", {
            'name': obj.name,
            'date': obj.date,
            'address': obj.address
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
                                  <ListItemText primary={x.name} secondary={x.date + "  -  " + x.address}/>
                    </ListItem>)
                    )}
                </List>
            </div>
            <UpdateDistribution productList={productList} selectedId={selectedId} setProductList={setProductList}/>
        </div>
    )
}


function AddForm(props) {
    let [name, setName] = useState('')
    const [date, setDate] = useState(new Date());
    let [address, setAddress] = useState('')

    return (
        <div>
            <form onSubmit={(e) => props.addProduct(e, {name:name, date:date, address:address })}>
                Name of a product:
                <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} /> <br />
                Adress:
                <input type="text" placeholder="address" onChange={(event) => setAddress(event.target.value)} /> <br />
                Date:
                {/*<DatePicker dateFormat="dd.MM.y" onChange={(date) => setDate(date)} value={date}/> <br />*/}
                <DatePicker  onChange={date => setDate(date)} value={date} dateFormat="DD/MM/YYYY"/>
                <Button type="submit"> Add product</Button>
            </form>
        </div>
    )
}

export default DailyDistribution