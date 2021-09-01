import { Button } from "react-bootstrap"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DatePicker from 'react-date-picker';
import UpdateDistribution from "./UpdateDistribution2"

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
    const [distributionList,setDistributionList]=useState([])
    const classes = useStyles();

    //todo:move it to other file
    const [productName, setProductName] = useState([]);

    const handleListItemClick = (event, index, id) => {
        setSelectedIndex(index);
        setSelectedId(id);
    };

    let openAddingForm = () => {
        setFormVisibility(true)
    }

    useEffect(() => {
        axios.get("http://localhost:8080/products2").then(res => setProductList(res.data))
        axios.get("http://localhost:8080/distributions").then(res => setDistributionList(res.data))

    }, [])

    let addProduct = () => {
        axios.post("http://localhost:8080/products", { name: productName })
            .then(res => setProductList(res.data))
    }

    return (

        <div>
            <input type="text" placeholder="product name" onChange={e => setProductName(e.target.value)} />
            <input type="button" value="add product" onClick={addProduct} />

            <div className="container">
                <div>
                    <AddForm products={productList} setDistributionList={setDistributionList}/>
                </div>
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        {distributionList.map((x, index) =>
                        (<ListItem button selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index, x.id)} key={index}>
                            <ListItemText primary={new Date(x.date).toLocaleDateString("en-US")} secondary={x.address+", "+x.city} />
                        </ListItem>)
                        )}
                    </List>
                </div>
                <UpdateDistribution distributionList={distributionList} selectedId={selectedId} setDistributionList={setDistributionList} />
            </div></div>
    )
}


function AddForm(props) {
    let [productIdList, setProductIdList] = useState([])
    let [selected, setSelected] = useState()
    const [date, setDate] = useState(new Date());
    let [city, setCity] = useState('')
    let [address, setAddress] = useState('')
    const [amount, setAmount] = useState(0);

    useEffect(()=>{
        setDate(new Date())
    },[])

    let addDistribution=()=>{
        axios.post("http://localhost:8080/distributions",{
            date: date,
            city:city,
            address: address,
            productIds: productIdList,
        }).then(res=>props.setDistributionList(res.data))
    }

    let addProductId=()=>{
        let selectedValue=JSON.parse(selected)
        setProductIdList(old=>[...old,{prodId:selectedValue._id,name:selectedValue.name,amount:amount}])
    }

    useEffect(()=>{
        if(props.products.length>0){
            setSelected(JSON.stringify({_id: props.products[0]._id, name:props.products[0].name}))
        }
    },[])

    return (
        <div>
            <select onChange={e => setSelected(e.target.value)}>
                {props.products.map((x, key) => <option key={key} value={JSON.stringify(x)}>{x.name}</option>)}
            </select>
            amount: <input type="number" max={100} value={amount} onChange={e => setAmount(e.target.value)} />

            <input type="button" value="add to distribution" onClick={addProductId} /><br/>
            Products List: <ul>{productIdList.map((x,key)=><li key={key}>{x.name}</li>)}</ul>
            City:
            <input type="text" placeholder="city" onChange={(event) => setCity(event.target.value)} /> <br />
            Address:
            <input type="text" placeholder="address" onChange={(event) => setAddress(event.target.value)} /> <br />
            Date:
            <DatePicker onChange={date => setDate(date)} value={date} dateFormat="DD/MM/YYYY" />
            <input type="button" disabled={productIdList.length<1} value="add distribution" onClick={addDistribution}/>
        </div>
    )
}

export default DailyDistribution