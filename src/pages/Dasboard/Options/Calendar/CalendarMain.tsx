import { Tab, Tabs } from "@nextui-org/react";
import Calendar from "./Calendar";
import CalendarFull from "./CalendarFull";

export default function CalendarMain() {
    return (
        <Tabs className="flex w-full flex-col px-5 pt-2" color="primary">
            <Tab title="wydarzenia">
                <Calendar/>
            </Tab>
            <Tab title="kalendarz">
                <CalendarFull/>
            </Tab>
            <Tab title="miesiące">

            </Tab>
        </Tabs>
    )
}