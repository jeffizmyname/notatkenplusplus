import { Card, CardBody } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time: Date) => {
        return time.toLocaleTimeString('en-US', {hour12: false});
    };


    return (
        <Card className="mx-5 mb-3 lg:mb-0">
            <CardBody className="flex items-center justify-center">
                <span className="text-5xl">{formatTime(currentTime)}</span>
            </CardBody>
        </Card>
    )
}