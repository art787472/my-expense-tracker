import { useState, useEffect, useContext } from "react";
import FullFeaturedCrudGrid from "../../components/FullFeaturedCrudGrid";
import { Box } from "@mui/material";
import axios from "../../utils/axios"
import UserContext from "../../store/user-context"

export async function getStaticProps () {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const res = await fetch ('https://localhost:7283/api/category')
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  const data = await res.json()
  

  return {
    props: {
      categoriesData: data.data
    }
  }
}

export default function Home({ categoriesData }) {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState(null);
  const userCtx = useContext(UserContext);
  const sc = categoriesData.flatMap(c => c.subCategories)

  useEffect(()=>{


    const initialize = async () => {
    const storedUser = localStorage.getItem('user');
    let userJson = null
    if (storedUser) {
      
      userJson = JSON.parse(storedUser)
      setUser(userJson);
    }
      const response = await axios.get(`https://localhost:7283/api/expense?userId=${userJson?.id}`)
      const data = response.data.data
      
      const rederData = data.map(datum => {
        return {
          ...datum,
          category: datum.categoryId,
          subCategory: datum.subCategoryId,
          account: "visa",
          dateTime: new Date(datum.dateTime)

        }
      })
      setRows(rederData)
      console.log(rederData)
    }

    initialize()
  }, [])



  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <FullFeaturedCrudGrid rows={rows} setRows={setRows} categoriesData={categoriesData}/>
    </Box>
  );
}
