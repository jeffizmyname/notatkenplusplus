import { useState } from "react";
import { CCalendar } from "./Calendar";

export default function CalendarFull() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    const months = Array.from({ length: 12 }, (_, index) => {
        const firstDayOfMonth = new Date(new Date().getFullYear(), index, 1);
        return (
            <CCalendar
                key={index}
                currentDate={selectedDate || firstDayOfMonth}
                onDateClick={handleDateClick}
                style="months"
                events={null}
            />
        );
    });

    return <div className="h-[90vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-scroll">
        {months}
        </div>;
}
