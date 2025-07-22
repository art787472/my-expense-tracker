import { useState, useEffect, useContext } from "react";
import FullFeaturedCrudGrid from "../../components/FullFeaturedCrudGrid";
import { Box } from "@mui/material";
import axios from "../../utils/axios"
import UserContext from "../../store/user-context"
export default function Home() {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState(null);
  const userCtx = useContext(UserContext);
  

  useEffect(()=>{


    const initialize = async () => {
    const storedUser = localStorage.getItem('user');
    let userJson = null
    if (storedUser) {
      console.log("user found")
      userJson = JSON.parse(storedUser)
      setUser(userJson);
    }
      const response = await axios.get(`https://localhost:7283/api/expense?userId=${userJson.id}`)
      const data = response.data
      const rederData = data.map(datum => {
        return {
          ...datum,
          dateTime: new Date(datum.dateTime)

        }
      })
      setRows(rederData)
      
    }

    initialize()
  }, [])
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <FullFeaturedCrudGrid rows={rows} setRows={setRows} />
    </Box>
  );
}
