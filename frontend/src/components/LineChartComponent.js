import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartComponent = ({ stateData }) => {
    const data = stateData.map(item => {
        return {
          time: new Date(item.created_datetime).toLocaleTimeString(),
          value: parseInt(item.data["Vaihtoautojen määrä"])
        };
    });
    return (

        <LineChart width={400} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
  );
};

export default LineChartComponent;