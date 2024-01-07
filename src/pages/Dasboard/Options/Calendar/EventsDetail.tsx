import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { format } from "date-fns"
import { pl } from 'date-fns/locale';


interface Props {
    currentDate: Date | null
}

export default function EventDetails(props: Props) {
    return (
        <div className="lg:my-5 sm:mx-5 md:mx-5 w-[50%]">
            <Card className="w-full">
                <CardHeader className="flex flex-col items-start">
                    <p
                    className="text-3xl">
                        {props.currentDate !== null ? format(props.currentDate, 'd MMMM, yyyy', {locale: pl}) : "nie wybrano daty"}
                    </p>
                    <p
                    className="my-1 text-default-300">
                        {props.currentDate !== null ? format(props.currentDate, 'EEEE', {locale: pl}) : "nie wybrano daty"}
                    </p>
                </CardHeader>
                <CardBody>
                    
                </CardBody>
            </Card>
        </div>
    )
}