import Container from "@mui/material/Container"
import CategoryPieChart from "../../components/CategoryPieChart"
import CategoryBarChart from "../../components/CategoryBarChart"

export default function Home() {
    return (
        <Container>

            <CategoryPieChart />
            <CategoryBarChart />
        </Container>
    )
}