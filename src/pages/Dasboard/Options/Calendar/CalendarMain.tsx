import { Tab, Tabs } from "@nextui-org/react";
import Calendar from "./Calendar";
import CalendarFull from "./CalendarFull";
import CalendarMonths from "./CalendarMonths";

export default function CalendarMain() {
    return (
        <Tabs className="flex w-full h-fit flex-col pb-0 px-5 pt-2" color="primary">
            <Tab title="wydarzenia">
                <Calendar/>
            </Tab>
            <Tab title="kalendarz" className="pb-0">
                <CalendarFull/>
            </Tab>
            <Tab title="miesiące">
                <CalendarMonths/>
            </Tab>
        </Tabs>
    )
}