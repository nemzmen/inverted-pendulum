import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const getDataKey = (array, index) => {
  if (!array || array.length === 0) {
    return '';
  }
  const keys = Object.keys(array[0]);
  if (!keys || keys.length < index + 1) {
    return '';
  }
  return keys[index];
}

export const ChartComponent = ({
  data = defaultProps.data,
  width = defaultProps.width,
  height = defaultProps.height,
  stroke = defaultProps.stroke,
  stroke2 = defaultProps.stroke2,
  stroke3 = defaultProps.stroke3,
}) => {
  const xDataKey = getDataKey(data, 0);
  const yDataKey = getDataKey(data, 1);
  const zDataKey = getDataKey(data, 2);
  const iDataKey = getDataKey(data, 3);

  return (

    <LineChart
      data={data}
      width={width}
      height={height}
      margin={{top: 20, right: 20}}
    >
      <XAxis dataKey={xDataKey} />
      <YAxis domain={['auto', 'auto']} />
      <CartesianGrid vertical={true} horizontal={true} />
      <Line dataKey={yDataKey} stroke={stroke} dot={false} strokeWidth={2} />
      <Line dataKey={zDataKey} stroke={stroke2} dot={false} strokeWidth={2} />
      <Line dataKey={iDataKey} stroke={stroke3} dot={false} strokeWidth={2} />
      <Tooltip
        wrapperStyle={{
          borderColor: 'white',
          boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
        }}
        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        labelStyle={{ fontWeight: 'bold', color: '#666666' }}
      />
    </LineChart>
  );
}

const defaultProps = {
  data: [],
  width: 600,
  height: 200,
  // stroke: `#${Math.floor(Math.random()*10000000).toString(16)}`,
  stroke: "#82ca9d",
  stroke2: "#8884d8",
  stroke3: "#c92118",
};



export default ChartComponent;