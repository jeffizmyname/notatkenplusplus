import React, { useState } from 'react';
import { format, startOfMonth, addMonths, subMonths, eachDayOfInterval, isToday } from 'date-fns';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import EventForm from './eventForm';

interface CalendarProps {
    currentDate: Date;
    onDateClick: (date: Date) => void;
}

const CCalendar: React.FC<CalendarProps> = ({ currentDate, onDateClick }) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(currentDate));

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
            <div className='grid grid-cols-6 grid-rows-5 w-fit h-fit'>
                {daysInMonth.map((date) => (
                    <div className={`w-[60px] h-[50px] border-1 border-default flex items-center justify-center ${isToday(date) ? 'text-red-500' : ''}`} key={date.toISOString()} onClick={() => onDateClick(date)}>
                        {format(date, 'd')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const {isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalSelection, setModalSelection] = useState("select");


    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setModalSelection('select')
        onOpen()
    };

    return (
        <div className=''>
            <CCalendar currentDate={selectedDate || new Date()} onDateClick={handleDateClick} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {modalSelection === 'select' && (
                        <>
                            <ModalHeader>{selectedDate !== null ? format(selectedDate, 'yyyy MM dd') : ""}</ModalHeader>
                            <ModalBody>
                                <Button onClick={() => setModalSelection('todo')}>dodaj todo</Button>
                                <Button onClick={() => setModalSelection('zadanie')}>dodaj zadanie</Button>
                            </ModalBody>
                        </>
                    )}
                    {modalSelection === 'zadanie' && (
                        <>
                            <EventForm/>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
