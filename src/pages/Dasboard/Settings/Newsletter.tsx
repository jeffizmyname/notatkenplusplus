import { Card, CardBody, Checkbox, Button } from "@nextui-org/react";
import axios from "axios";
import { getId } from "../../../utils/userData";

export default function Newsletter() {

    const handleNewsletter = (state) => {
        axios.post("localhost:3000/settings/newsletter", state, getId())
    }

    //button waljue przekasz 
    return (
        <Card className="w-[500px] h-[65px]">
        <CardBody className="flex flex-row justify-between">
            <Checkbox>Chce otrymywać newslettera z nowościami</Checkbox>
            <Button color="primary" variant="flat" onClick={() => handleNewsletter()}>Zapisz</Button>
        </CardBody>
        </Card>
    )
}