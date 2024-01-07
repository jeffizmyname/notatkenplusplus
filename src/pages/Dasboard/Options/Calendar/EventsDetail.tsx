import { Button, ButtonGroup, Card, CardBody, CardHeader } from "@nextui-org/react";
import axios from "axios";
import { differenceInMinutes, format, formatDistanceToNow, parse } from "date-fns";
import { pl } from "date-fns/locale";
import { getId } from "../../../../utils/userData";
import Event from "./Event";
import React, { ReactNode, useEffect, useState } from "react";
import { LeftArrow } from "../../../../assets/icons/LeftArrow";
import { RightArrow } from "../../../../assets/icons/RightArrow";

interface Props {
    currentDate: Date | null;
    onPrevDayClick: () => void;
    onNextDayClick: () => void;
    onOpen: () => void;
}

interface EventData {
    type: string,
    start: string,
    end: string,
    title: string,
    desc: string,
    date: string
}

export default function EventDetails(props: Props) {

    const [eventData, setEventData] = useState<EventData[] | null>([]);
    let emptyf: React.ReactNode[] = []
    const timeSlots = []

    const getDayEvents = (date: string) => {
        const id = getId();
        axios.post("http://192.168.100.245:3001/calendar/getTask", { id, date })
            .then((response) => setEventData(response.data.res.map((item: { Data: string; }) => JSON.parse(item.Data))))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (props.currentDate !== null) {
            const currentDateFormatted = format(props.currentDate!, 'yyyy-MM-dd');
            setEventData(null)
            getDayEvents(currentDateFormatted);
        }
    }, [props.currentDate]);

    if (props.currentDate !== null) console.log(eventData)

    for (let hour = 0; hour <= 48; hour++) {
        emptyf.push(
            <div key={hour} className={`flex border-1 border-default h-20 overflow-visible`}></div>
        );
    }

    console.log(emptyf)

    const modifyElement = (
        elements: React.ReactNode[],
        indexToModify: number,
        newChildren: ReactNode
    ): React.ReactNode[] => {
        // Create a new array with the modified element
        const modifiedArray = elements.map((element, index) => {
            if (index === indexToModify && React.isValidElement(element)) {
                // If it's the target index, clone the element with new children
                return React.cloneElement(element, {}, newChildren);
            }
            // Otherwise, return the element as is
            return element;
        });

        return modifiedArray;
    };

    eventData?.forEach((event) => {
        //const add = Number(event?.start.split(':').pop()) >= 30 ? 2 : 1
        const hour = Number(event?.start.split(':').shift()) * 2 + 1
        const len = differenceInMinutes(parse(event.end, "HH:mm", new Date()), parse(event.start, "HH:mm", new Date()))
        const hours = Math.floor(len / 60);
        const minutes = len % 60;
        console.log(hour)
        emptyf = modifyElement(
            emptyf, 
            hour, 
            <Event 
                title={event?.title} 
                desc={event?.desc} 
                start={event?.start} 
                times={(hours + minutes / 30) * 2} />);

        //const add = Number(event?.start.split(':').pop()) >= 30 ? 2 : 1
        // {hour === Number(event?.start.split(':').shift()) * 2 + add ?
        // props.currentDate !== null ?
        // format(props.currentDate, "yyyy-MM-dd") === event?.date ?
        // <Event title={event?.title} desc={event?.desc} start={event?.start} times={2} /> : null : null : null}

        // temp.forEach(e => {
        //     if(e.props.children !== null) {
        //         console.log(e)
        //     }
        // })
        // console.log('-----------------')
        // sche.push(temp)
    })

    //console.log(sche[0])

    // function mergeArrays(...arrays): [] {
    //     const resultArray[] = [];

    //     for (let i = 0; i < arrays[0].length; i++) {
    //         for (const array of arrays) {
    //             if (array[i] !== 'x') {
    //                 resultArray[i] = array[i];
    //                 break;
    //             }
    //         }
    //     }

    //     return resultArray;
    // }

    // const combinedArray = mergeArrays(sche)


    // console.log(combinedArray)\




    for (let hour = 0; hour < 24; hour++) {
        timeSlots.push(
            <div key={hour} className={`flex items-center justify-end h-40 w-12 mr-3`}>
                {hour+":00"}
            </div>
        );
    }
    return (
        <div className="lg:my-5 mx-5 lg:w-[70%] h-full">
            <Card className="w-full h-full">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-col items-start">
                        <p className="text-3xl">
                            {props.currentDate !== null
                                ? format(props.currentDate, "d MMMM, yyyy", { locale: pl })
                                : "nie wybrano daty"}
                        </p>
                        <p className="my-1 text-default-300">
                            {props.currentDate !== null
                                ? format(props.currentDate, "EEEE", { locale: pl })
                                : "nie wybrano daty"}
                        </p>
                    </div>
                    <div className="flex lg:flex-row md:flex-row sm:flex-row xs:flex-col gap-2">
                    <ButtonGroup className='w-fit'>
                        <Button isIconOnly radius='sm' onClick={props.onPrevDayClick}>
                            <LeftArrow className='scale-50' />
                        </Button>
                        <span className='px-2 max-h-[40px] py-[7px] border-1 border-default bg-default flex justify-center items-center lg:w-fit overflow-hidden sm:w-[100px] xs:w-[100px]'>
                            {props.currentDate !== null
                                ? formatDistanceToNow(props.currentDate, { locale: pl, addSuffix: true})
                                : "brak"}
                        </span>
                        <Button isIconOnly radius='sm' onClick={props.onNextDayClick}>
                            <RightArrow className='scale-50' />
                        </Button>
                    </ButtonGroup>
                    <Button variant="solid" color="primary" radius="sm" onClick={props.onOpen}>Dodaj wydarzenie</Button>
                    </div>
                </CardHeader>
                <CardBody className="h-[800px] overflow-scroll flex flex-row">
                    <div className="w-fit]">
                        {timeSlots}
                    </div>
                    <div className="w-[95%]">
                        {emptyf}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
