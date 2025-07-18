import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const data = [
            { id: 0, value: 1000, label: '食' },
            { id: 1, value: 1500, label: '衣' },
            { id: 2, value: 2000, label: '住' },
            { id: 3, value: 120, label: '行' },
            { id: 4, value: 800, label: '樂' },
            { id: 5, value: 500, label: '其他' },
          ]

export default function CategoryPieChart() {
  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 50, outerRadius: 100,arcLabel: 'value'
        },
      ]}
      width={300}
      height={200}
    >
        <PieCenterLabel>{data.reduce((sum, x)=>sum + x.value, 0)}</PieCenterLabel>
        </PieChart>
  );
}