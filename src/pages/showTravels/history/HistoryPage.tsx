import {Paper} from "@mantine/core";
import {HistoryTravelCard} from "../../../components/cardCustom/historyTravelCard/HistoryTravelCard.tsx";

const HistoryPage = () =>{
    return (
        <Paper>
            {mockData.map((data, index) => (
                <HistoryTravelCard
                title={data.title}
                description={data.description}
                img={data.img}
                key={index}
                />
            ))}
            <HistoryTravelCard
            title={"Paris"}
            description={"Voyage à Paris"}
            img={"https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg"}
            />
        </Paper>
    )
}

export default HistoryPage

const mockData = [
    {
        title: "Paris",
        description: "Voyage à Paris",
        img: "https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg"
    },
    {
        title: "Paris",
        description: "Voyage à Paris",
        img: "https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg"
    },
    {
        title: "Paris",
        description: "Voyage à Paris",
        img: "https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg"
    },
    {
        title: "Paris",
        description: "Voyage à Paris",
        img: "https://media.admagazine.fr/photos/632449f714420dbf05ebc6f9/16:9/w_2560%2Cc_limit/GettyImages-627393180.jpg"
    }
]