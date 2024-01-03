import React, { useState } from 'react';
import { format, startOfMonth, addMonths, subMonths, eachDayOfInterval } from 'date-fns';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';

interface CalendarProps {
    currentDate: Date;
    onDateClick: (date: Date) => void;
}

const CCalendar: React.FC<CalendarProps> = ({ currentDate, onDateClick }) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(currentDate));
    //const today = endOfDay(new Date());

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: addMonths(startOfMonth(currentMonth), 1),
    });

    return (
        <div>
            <div>
                <Button onClick={handlePrevMonth}>prev</Button>
                <span className='mx-10'>{format(currentMonth, 'MMMM yyyy')}</span>
                <Button onClick={handleNextMonth}>next</Button>
            </div>
            <div className='grid grid-cols-6 grid-rows-5'>
                {daysInMonth.map((date) => (
                    <div key={date.toISOString()} onClick={() => onDateClick(date)}>
                        {format(date, 'd')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onOpen()
    };

    return (
        <div className=''>
            <CCalendar currentDate={selectedDate || new Date()} onDateClick={handleDateClick} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>{selectedDate !== null ? format(selectedDate, 'yyyy MM dd') : ""}</ModalHeader>
                    <ModalBody>
                        <Button>dodaj todo</Button>
                        <Button>dodaj zadanie</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

/*

{
    {type: "", name: "", desc: ""}
}

*/