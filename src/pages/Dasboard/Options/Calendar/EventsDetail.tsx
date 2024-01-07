import { Card, CardBody, CardHeader } from "@nextui-org/react";
import axios from "axios";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { getId } from "../../../../utils/userData";

interface Props {
    currentDate: Date | null;
}

export default function EventDetails(props: Props) {
    const getDayEvents = () => {
        const id = getId();
        axios
            .post("http://localhost:3001/calendar/getTask", { id })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    };

    return (
        <div className="lg:my-5 sm:mx-5 md:mx-5 w-[50%]">
            <Card className="w-full">
                <CardHeader className="flex flex-col items-start">
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
                </CardHeader>
                <CardBody>
                    <div
                        className="ey fh fl mb acc acf"
                        // style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr));"
                    >
                        <div className=""></div>
                        <div>
                            <div className="">12AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">1AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">2AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">3AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">4AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">5AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">6AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">7AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">8AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">9AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">10AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">11AM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">12PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">1PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">2PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">3PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">4PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">5PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">6PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">7PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">8PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">9PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">10PM</div>
                        </div>
                        <div></div>
                        <div>
                            <div className="">11PM</div>
                        </div>
                        <div></div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
