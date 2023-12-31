import React, { useState } from 'react';
import { format, startOfMonth, addMonths, subMonths, eachDayOfInterval } from 'date-fns';

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
                <button onClick={handlePrevMonth}>Previous Month</button>
                <span>{format(currentMonth, 'MMMM yyyy')}</span>
                <button onClick={handleNextMonth}>Next Month</button>
            </div>
            <div>
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

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        // Do something with the selected date
    };

    return (
        <div className='block'>
            <h1>Calendar App</h1>
            <CCalendar currentDate={selectedDate || new Date()} onDateClick={handleDateClick} />
        </div>
    );
}
