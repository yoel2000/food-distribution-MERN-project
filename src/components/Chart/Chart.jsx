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

    let chooseCityHandler = (event, city) => {
        if (event.target.checked)
            (setChooseCity((chooseCity) => [...chooseCity, city]));
        else {

            var index = chooseCity.indexOf(city);

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

            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                // className="split left"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    ['Work', 11],
                    ['Eat', 2],
                    ['Commute', 2],
                    ['Watch TV', 2],

                ]}
                options={{
                    title: 'My Daily Activities',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="Bar"
                // className=" split right"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Year', 'Sales', 'Expenses', 'Profit'],
                    ['2014', 1000, 400, 200],
                    ['2015', 1170, 460, 250],
                    ['2016', 660, 1120, 300],
                    ['2017', 1030, 540, 350],
                ]}
                options={{
                    // Material design options
                    chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '2' }}
            />
        </div>

    )
}


export default MyChart