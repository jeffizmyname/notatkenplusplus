import React, { useEffect, useState } from 'react';
import { format, startOfMonth, addMonths, subMonths, eachDayOfInterval, isToday, addDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import EventForm from './EventForm';
import EventDetails from './EventsDetail';
import { RightArrow } from '../../../../assets/icons/RightArrow';
import { LeftArrow } from '../../../../assets/icons/LeftArrow';
import './scrollbarstyle.css'
import Clock from './clock';

interface EventData {
    type: string,
    start: string,
    end: string,
    title: string,
    desc: string,
    date: string
}

interface CalendarProps {
    currentDate: Date;
    onDateClick: (date: Date) => void;
    style: string;
    events: EventData[] | null;
}

const hardcodedDaysArray = [
    { prev: 0, next: 10 }, // January
    { prev: 3, next: 10 }, // February
    { prev: 4, next: 6 }, // March
    { prev: 0, next: 11 }, // April
    { prev: 2, next: 8 }, // May
    { prev: 5, next: 6 }, // June
    { prev: 0, next: 10 }, // July
    { prev: 3, next: 7 }, // August
    { prev: 6, next: 5 }, // September
    { prev: 1, next: 9 }, // October
    { prev: 4, next: 7 }, // November
    { prev: 6, next: 4 }, // December
];

export const CCalendar: React.FC<CalendarProps> = ({ currentDate, onDateClick, style, events = null }) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(currentDate));
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

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
        hardcodedDaysArray[currentMonth.getMonth()].next = 9;
    }

    const daysInGrid = eachDayOfInterval({
        start: addDays(startOfMonth(currentMonth), -daysFromPrevMonth),
        end: addDays(addMonths(startOfMonth(currentMonth), 1), daysFromNextMonth),
    });

    return (
        <div className={`m-5 mt-2 lg:h-[400px]`}>
            {style !== "months" ?
                <div className='mb-2'>
                    <ButtonGroup className='w-full'>
                        <Button isIconOnly radius='sm' onClick={handlePrevMonth}>
                            <LeftArrow className='scale-50' />
                        </Button>
                        <span className='py-[7px] border-1 border-default bg-default w-full flex justify-center items-center'>
                            {format(currentMonth, 'LLLL yyyy', { locale: pl })}
                        </span>
                        <Button isIconOnly radius='sm' onClick={handleNextMonth}>
                            <RightArrow className='scale-50' />
                        </Button>
                    </ButtonGroup>
                </div> :
                <div>
                    <span style={{ textTransform: 'capitalize' }} className='w-full flex justify-center items-center px-10 font-medium tracking-wider'>
                        {format(currentMonth, 'LLLL', { locale: pl })}
                    </span>
                </div>}
            <div className={`flex flex-row justify-around my-2 w-full`}>
                <span>P</span>
                <span>W</span>
                <span>S</span>
                <span>C</span>
                <span>P</span>
                <span>S</span>
                <span>N</span>
            </div>
            <div className={`grid grid-cols-7 grid-rows-6 h-fit ${style === 'months' ? 'lg:w-full'
                : ""} ${style !== "big" ? 'lg:w-fit md:w-full sm:w-full xs:w-full' : 'w-full'} 
            [&>*:nth-child(1)]:rounded-tl-lg
            [&>*:nth-child(7)]:rounded-tr-lg
            [&>*:nth-child(36)]:rounded-bl-lg
            [&>*:nth-child(42)]:rounded-br-lg`}>
                {daysInGrid.map((date) => (
                    <div
                        className={`${style !== "big" ? 'relative lg:p-[20px] h-[50px] border-1 border-default flex items-center justify-center z-[1] bg-default-100 hover:bg-default' :
                            style === 'big' ? "relative h-[calc(100vh/9)] xs:h-[calc(100vh/8.5)] lg:h-[calc(100vh/7.6)] border-1 border-default pr-4 pl-4 pt-4" :
                                style === 'months' ? 'lg:w-full'
                                    : ""}
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
                        {events !== null ? (
                            <div className='w-full lg:h-[calc(100vh/20)] xs:h-[30%] flex flex-row lg:flex-col items-end lg:items-start gap-1 overflow-y-scroll'>
                                {events.map((e, index) => (
                                    format(e.date, 'yyy-MM-dd') === format(date, 'yyy-MM-dd') ? (
                                        <React.Fragment key={index}>
                                            <div className='lg:flex lg:flex-row justify-between md:hidden sm:hidden xs:hidden w-full'>
                                                <div className='lg:truncate lg:w-[60%] md:w-full'>{e.title}</div>
                                                <div className='lg:block md:hidden sm:hidden xs:hidden'>{e.start}</div>
                                            </div>
                                            <div className='block lg:hidden w-3 h-3 xs:w-2 xs:h-2 bg-primary rounded-full'></div>
                                        </React.Fragment>
                                    ) : null
                                ))}
                            </div>
                        ) : null}

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
    };

    const handlePrevDayClick = () => {
        if (selectedDate) {
            const prevDay = addDays(selectedDate, -1);
            setSelectedDate(prevDay)
        }
    };

    const handleNextDayClick = () => {
        if (selectedDate) {
            const nextDay = addDays(selectedDate, 1);
            setSelectedDate(nextDay)
        }
    };

    return (
        <div className='flex lg:flex-row flex-col w-full h-full'>
            <div>
                <CCalendar
                    currentDate={selectedDate || new Date()}
                    onDateClick={handleDateClick}
                    style='normal'
                    events={null} />
                <Clock />
            </div>
            <EventDetails
                currentDate={selectedDate}
                onPrevDayClick={handlePrevDayClick}
                onNextDayClick={handleNextDayClick}
                onOpen={() => { setModalSelection('select'); onOpen(); }} />
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
                    {modalSelection === 'zadanie' && selectedDate !== null && (
                        <>
                            <EventForm today={selectedDate!} />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
