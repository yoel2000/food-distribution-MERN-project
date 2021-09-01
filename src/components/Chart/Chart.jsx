import React from "react"
import { Chart } from "react-google-charts";


function myChart() {
    return(
        <div>
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


export default myChart