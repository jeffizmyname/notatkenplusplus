import { useState } from "react";
import { CCalendar } from "./Calendar";

export default function CalendarFull() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };
    
    return (
        <div>
            <CCalendar
            currentDate={selectedDate || new Date()} 
            onDateClick={handleDateClick}
            style="months"
            events={null}/>

            <CCalendar
            currentDate={selectedDate || new Date()} 
            onDateClick={handleDateClick}
            style="months"
            events={null}/>
        </div>
    )
}