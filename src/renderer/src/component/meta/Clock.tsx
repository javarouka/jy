import './MetaInformation.css';
import {useTime} from "@renderer/hook/useTime";

function Clock() {

    const { currentDate, currentTime } = useTime();
    return (
        <div className="info-item">{currentDate} {currentTime}</div>
    );
}

export default Clock
