import { useEffect, useState, useContext } from "react"
import Container from "@mui/material/Container"
import CategoryPieChart from "../../components/CategoryPieChart"
import CategoryBarChart from "../../components/CategoryBarChart"
import axios from "../../utils/axios"
import UserContext from "../../store/user-context"
import { get, groupBy, toPairs } from "lodash"

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
    const userCtx = useContext(UserContext);
  const user = userCtx.user
    useEffect(()=>{
    const initialize = async () => {
      const response = await axios.get(`https://localhost:7283/api/expense?userId=${user.userId}`)
      const data = response.data
      const rederData = groupBy(data, ({category}) => category)
      console.log(rederData)
      const result = Object.entries(rederData).map(( [category, entries], idx) => {
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

            <CategoryPieChart data={data}/>
            <CategoryBarChart />
        </Container>
    )
}