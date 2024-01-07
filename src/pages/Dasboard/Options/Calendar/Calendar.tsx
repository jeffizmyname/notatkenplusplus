import React, { useState } from 'react';
import { format, startOfMonth, addMonths, subMonths, eachDayOfInterval, isToday, addDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import EventForm from './EventForm';
import EventDetails from './EventsDetail';
import { RightArrow } from '../../../../assets/icons/RightArrow';
import { LeftArrow } from '../../../../assets/icons/LeftArrow';

interface CalendarProps {
    currentDate: Date;
    onDateClick: (date: Date) => void;
}

const hardcodedDaysArray = [
    { prev: 5, next: 5 }, // January
    { prev: 1, next: 12 }, // February
    { prev: 6, next: 4 }, // March
    { prev: 6, next: 5 }, // April
    { prev: 5, next: 5 }, // May
    { prev: 6, next: 5 }, // June
    { prev: 5, next: 5 }, // July
    { prev: 5, next: 5 }, // August
    { prev: 5, next: 6 }, // September
    { prev: 6, next: 4 }, // October
    { prev: 5, next: 6 }, // November
    { prev: 3, next: 7 }, // December
];

const CCalendar: React.FC<CalendarProps> = ({ currentDate, onDateClick }) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(currentDate));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const leapYear = (year: number) => {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    const { prev: daysFromPrevMonth, next: daysFromNextMonth } = hardcodedDaysArray[currentMonth.getMonth()];

    if (currentMonth.getMonth() === 1 && leapYear(currentMonth.getFullYear())) {
        hardcodedDaysArray[currentMonth.getMonth()].next = 11;
    }


    const daysInGrid = eachDayOfInterval({
        start: addDays(startOfMonth(currentMonth), -daysFromPrevMonth),
        end: addDays(addMonths(startOfMonth(currentMonth), 1), daysFromNextMonth),
    });

    return (
        <div className='m-5'>
            <div className='mb-2'>
                <ButtonGroup className='w-full'>
                    <Button isIconOnly radius='sm' onClick={handlePrevMonth}>
                        <LeftArrow className='scale-50' />
                    </Button>
                    <span className='py-[7px] border-1 border-default bg-default w-full flex justify-center items-center'>
                        {format(currentMonth, 'LLLL yyyy', {locale: pl})}
                    </span>
                    <Button isIconOnly radius='sm' onClick={handleNextMonth}>
                        <RightArrow className='scale-50' />
                    </Button>
                </ButtonGroup>
            </div>
            <div className='flex flex-row justify-around my-2'>
                <span>P</span>
                <span>W</span>
                <span>S</span>
                <span>C</span>
                <span>P</span>
                <span>S</span>
                <span>N</span>
            </div>
            <div className='grid grid-cols-7 grid-rows-6 w-full h-fit 
            [&>*:nth-child(1)]:rounded-tl-lg
            [&>*:nth-child(7)]:rounded-tr-lg
            [&>*:nth-child(36)]:rounded-bl-lg
            [&>*:nth-child(42)]:rounded-br-lg'>
                {daysInGrid.map((date) => (
                    <div 
                        className={`lg:w-[60px] h-[50px] border-1 border-default flex items-center justify-center z-[1] bg-default-100 hover:bg-default
                        ${isToday(date) ? 'text-primary font-bold' : ''} 
                        ${date.getMonth() !== currentMonth.getMonth() ? 'bg-default-50' : ''}
                        ${selectedDate && date.toISOString() === selectedDate.toISOString() ? 'before:z-[-1] before:absolute before:w-7 before:h-7 before:content-[\'\'] before:rounded-full before:bg-default' : ''}`}
                        key={date.toISOString()}
                        onClick={() => {
                            onDateClick(date)
                            setSelectedDate(date)
                        }}
                    >
                        {format(date, 'd')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalSelection, setModalSelection] = useState("select");


    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setModalSelection('select')
        onOpen()
    };

    return (
        <div className='flex lg:flex-row flex-col '>
            <CCalendar currentDate={selectedDate || new Date()} onDateClick={handleDateClick} />
            <EventDetails currentDate={selectedDate} />
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
                            <EventForm today={selectedDate!} />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
