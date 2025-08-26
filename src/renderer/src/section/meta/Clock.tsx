import './MetaInformation.css';
import {useTime} from "@renderer/hook/useTime";
import Box from "@renderer/component/Box";

function Clock() {

    const { currentDate, currentTime } = useTime();
    return (
        <Box className="info-item">{currentDate} {currentTime}</Box>
    );
}

export default Clock
