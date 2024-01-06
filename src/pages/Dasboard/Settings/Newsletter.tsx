import { Card, CardBody, Checkbox, Button } from "@nextui-org/react";
import axios from "axios";
import { getId } from "../../../utils/userData";
import { useState } from "react";

export default function Newsletter() {
    const [isSelected, setIsSelected] = useState(false);
    
    const handleNewsletter = () => {
        const id = getId();
        console.log(isSelected + " " + id)
        axios.post("http://localhost:3001/settings/newsletter", {isSelected, id})
        .catch(err => console.log(err))
    }


    return (
        <Card className="h-[65px]">
        <CardBody className="flex flex-row justify-between">
            <Checkbox
            isSelected={isSelected} onValueChange={setIsSelected}>Chce otrymywać newslettera z nowościami</Checkbox>
            <Button color="primary" variant="flat" onClick={handleNewsletter}>Zapisz</Button>
        </CardBody>
        </Card>
    )
}