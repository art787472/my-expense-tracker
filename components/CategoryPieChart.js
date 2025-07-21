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



export default function CategoryPieChart({data}) {
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