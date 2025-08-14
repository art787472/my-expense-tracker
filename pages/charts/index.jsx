import { useEffect, useState, useContext } from "react"
import Container from "@mui/material/Container"
import CategoryPieChart from "../../components/CategoryPieChart"
import CategoryBarChart from "../../components/CategoryBarChart"
import axios from "../../utils/axios"
import UserContext from "../../store/user-context"
import { get, groupBy, toPairs } from "lodash"
import Cookies from "js-cookie"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { LineChart } from '@mui/x-charts/LineChart';
function getWeekOfMonth(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  return Math.ceil(day / 7); // 第一週 1~7，第二週 8~14，以此類推
}

function groupByWeekAndCategory(records) {
  const weekMap = new Map();

  records.forEach(({ category, amount, date }) => {
    const week = getWeekOfMonth(date); // 1, 2, 3, or 4...
    const key = `第${week}周`;

    if (!weekMap.has(key)) {
      weekMap.set(key, { food: 0, clothes: 0, living: 0, traffic: 0, week: key });
    }

    const entry = weekMap.get(key);
    if (entry.hasOwnProperty(category)) {
      entry[category] += amount;
    }
  });

  // 按照周數排序（可選）
  return Array.from(weekMap.values()).sort((a, b) => a.week.localeCompare(b.week, 'zh-Hant-u-nu-hanidec'));
}

export default function Home() {
  const [data, setData] = useState([])
  const [barData, setBarData] = useState([{
    "week"
      :
      29,
    categoryAmounts: {
      "交通"
        :
        0,
      個人
        :
        0,
      娛樂
        :
        100,
      學習
        :
        0,
      購物
        :
        0,
      飲食
        :
        0
    }
  }])
  const userCtx = useContext(UserContext);
  useEffect(() => {
    const initialize = async () => {
      const user = JSON.parse(localStorage["user"])
      const response = await axios.get(`https://localhost:7283/api/expense?userId=${user.id}`)
      const data = response.data.data
      const rederData = groupBy(data, ({ category }) => category)

      const responseData = await axios.get(`https://localhost:7283/api/chart/barchart?userId=${user.id}`)
      setBarData(responseData.data)
      console.log(responseData.data)
      const result = Object.entries(rederData).map(([category, entries], idx) => {
        return {
          id: idx,
          label: category,
          value: entries.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
        }
      })
      setData(result)

      //   const barData = data.map(datum => {
      //     return {
      //         ...datum,
      //         week: getWeekOfMonth(dateTime)
      //     }
      //   })
      //   const barRenderData = groupBy(barData, ({week}) => week)
      //   const newData = toPairs(barRenderData)
      //   const barResult = newData.map(() => {})
    }

    initialize()
  }, [])

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid container size={12}>
          <Grid  size={6}>
            <Paper elevation={3} sx={{ height: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              <CategoryPieChart data={data} />
            </Paper>
          </Grid >
          <Grid  size={6}>
            <Paper elevation={3}>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    curve: "linear",
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    
                  },
                ]}
                
              />
            </Paper>
          </Grid>


        </Grid>
        <Grid size={12}>
          <Paper elevation={3}>
            <CategoryBarChart rawData={barData} />

          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}