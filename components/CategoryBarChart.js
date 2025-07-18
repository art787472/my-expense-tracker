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
export default function CategoryBarChart() {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'week' }]}
      series={[
        { dataKey: 'food', label: '食' },
        { dataKey: 'clothes', label: '衣' },
        { dataKey: 'living', label: '住' },
        { dataKey: 'traffic', label: '行' },
      ]}
      {...chartSetting}
    />
  );
}