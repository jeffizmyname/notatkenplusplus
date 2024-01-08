import { useEffect, useState } from "react";
import { CCalendar } from "./Calendar";
import axios from "axios";
import { getId } from "../../../../utils/userData";
import { Card, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { format } from "date-fns";
import React from "react";

interface EventData {
    type: string,
    start: string,
    end: string,
    title: string,
    desc: string,
    date: string
}

export default function CalendarFull() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventsData, setEventsData] = useState<EventData[] | null>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();



    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onOpen()
    };

    const getDayEvents = () => {
        const id = getId();
        axios.post("http://192.168.100.245:3001/calendar/getAllTask", { id })
            .then((response) => setEventsData(response.data.res.map((item: { Data: string; }) => JSON.parse(item.Data))))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getDayEvents()
    }, []);
    
    return (
        <div className="flex flex-col">
            <CCalendar
                currentDate={selectedDate || new Date()}
                onDateClick={handleDateClick}
                style="big"
                events={eventsData} />
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        <ModalHeader className="text-3xl font-bold">
                            {selectedDate !== null ? format(selectedDate, 'MM dd') : ""}
                        </ModalHeader>
                        <ModalBody>
                            {selectedDate !== null ? eventsData !== null ? eventsData.map((e, index) => (
                                        format(e.date, 'yyy-MM-dd') === format(selectedDate?.toDateString(), 'yyy-MM-dd') ? (
                                            <React.Fragment key={index}>
                                                <Card className="p-3">
                                                    <div className='flex flex-row justify-between w-full'>
                                                        <div className='truncate w-full'>{e.title}</div>
                                                        <div className=''>{e.start}</div>
                                                    </div>
                                                </Card>
                                            </React.Fragment>
                                        ) : null
                                    )) : "" : ""}
                        </ModalBody>
                    </ModalContent>
                </Modal>
        </div>
    )
}