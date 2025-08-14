import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


const chartSetting = {
  yAxis: [
    {
      label: '花費',
      width: 60,
    },
  ],
  height: 300,
};
const data = [
            { food: 100, clothes: 200, living: 200, traffic: 0, week: "第一周"},
            { food: 100, clothes: 200, living: 200, traffic: 0, week: "第二周"},
            { food: 100, clothes: 200, living: 200, traffic: 0, week: "第三周"},
            { food: 100, clothes: 200, living: 200, traffic: 0, week: "第四周"},
          ]
export default function CategoryBarChart({rawData}) {
  console.log(rawData)
  const chartData = rawData.map(datum => {
  return{
  ...datum.categoryAmounts,
  week: `第${datum.week}週`
  }
});
 const seriesData = Object.keys(rawData[0].categoryAmounts).map(d => {
  return {
    dataKey: d,
    label: d
  }
})
  return (
    <BarChart
      dataset={chartData}
      xAxis={[{ dataKey: 'week' }]}
      series={seriesData}
      {...chartSetting}
    />
  );
}