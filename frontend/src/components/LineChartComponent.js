import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

// TODO different search datas need different kinda representation 
// So search type should effect this in the future

const LineChartComponent = ({ stateData }) => {
  let yAxisTitle = null;
  if (stateData.length > 0) {
    const firstDataObject = stateData[0];
    const dataKeys = Object.keys(firstDataObject.data);
    
    if (dataKeys.length > 0) {
      yAxisTitle = dataKeys[0];
    }
  }
  const data = stateData.map(item => {
      return {
        time: new Date(item.created_datetime).toLocaleTimeString(),
        value: parseInt(item.data["Vaihtoautojen määrä"])
      };
  });
  return (
      <LineChart 
        width={400} 
        height={400} 
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 30,
        }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time">
            <Label value="Date" position="bottom" />
          </XAxis>
          <YAxis>
            <Label
              value={yAxisTitle}
              angle={-90}
              position="left"
              dy="-10"
            />
          </YAxis>
          <Tooltip labelFormatter={() => yAxisTitle} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
  );
};

export default LineChartComponent;