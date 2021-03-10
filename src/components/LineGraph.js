import React from 'react';
import {Line} from 'react-chartjs-2';

const LineGraph = ({historicalDeaths, historicalCases, historicalDates, historicalRecv}) => {
    const arrayDates = [];
    const datesFunc = () => {
        for (let i = 0; i < 210; i = i + 10) {
            arrayDates.push(historicalDates[i]);
        }
        return arrayDates;
    };
    datesFunc();
    const data = {
        labels: arrayDates,
        
        datasets: [
            {
                label: 'Total Deaths',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(35,30,45,1)',
                data: historicalDeaths.slice(0,21),
            },
            {
                label: 'Total Cases',
                fill: false,
                borderColor: 'rgba(180,60,70,1)',
                data: historicalCases.slice(0,21),
            },
            {   
                label: 'Total Recovered',
                fill: false,
                borderColor: 'rgba(35,200,80)',
                data: historicalRecv.slice(0,21),
            }
        ],
    };
    return(
        <Line data={data}/>
    )


}

export default LineGraph;