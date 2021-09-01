import React from "react"
import { Chart } from "react-google-charts";
import { useState } from "react";
import DatePicker from 'react-date-picker';
import { useEffect } from "react";
import { Checkbox } from "@material-ui/core";


const axios = require('axios')

function MyChart() {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('')
    const [chooseCity, setChooseCity] = useState([])
    const [pieChartVisibility, setPieChartVisibility] = useState(false)
    const [barChartVisibility, setBarChartVisibility] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/distributions/cities').then(res => {
            setCities(res.data);
            console.log(res.data);
        })
    }, [])

    let getCities = () => {
        axios.get('http://localhost:8080/distributions/cities').then(res => {
            setCities(res.data);
            ;
        })
    }

    useEffect(() => {
        if (chooseCity.length > 1) {
            setBarChartVisibility(true);
            setPieChartVisibility(false);
        }
        else if (chooseCity.length == 1){
            setPieChartVisibility(true);
            setBarChartVisibility(false);
        }
        else if (chooseCity.length == 0)
            setPieChartVisibility(false);
    }, [chooseCity])

    let chooseCityHandler = (event, city) => {
        if (event.target.checked)
            (setChooseCity((chooseCity) => [...chooseCity, city]));
        else {
            const newList = chooseCity.filter((c) => c !== city);
            setChooseCity(newList);
        }
    }

    return (
        <div>
            <h6>From date:</h6>
            <DatePicker onChange={fromDate => setFromDate(fromDate)} value={fromDate} dateFormat="DD/MM/YYYY" /> <br />
            <h6>To date:</h6>
            <DatePicker onChange={toDate => setToDate(toDate)} value={toDate} dateFormat="DD/MM/YYYY" /> <br />
            <ul>
                {cities.map((c, key) => <li><Checkbox onChange={e => chooseCityHandler(e, c)} />{c}</li>)}
            </ul>
            {pieChartVisibility ?
                <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                // className="split left"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Situation', 'Number of deliveries'],
                    ['Done', 11],
                    ['Not done', 2],
                ]}
                options={{
                    title: 'Success in the deliveries',
                }}
                rootProps={{ 'data-testid': '1' }}
            />: null}
            {barChartVisibility ? <Chart
                width={'500px'}
                height={'300px'}
                chartType="Bar"
                // className=" split right"
                loader={<div>Loading Chart</div>}
                data={[
                    ['City', 'Done', 'Not done'],
                    [chooseCity[0], 7, 2],
                    [chooseCity[1], 8, 3]
                ]}
                options={{
                    // Material design options
                    chart: {
                        title: 'Succes in different cyties',
                        // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '2' }}
            />: null}
        </div>

    )
}


export default MyChart