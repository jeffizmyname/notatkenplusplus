import { Card, CardBody, Checkbox, Button } from "@nextui-org/react";
import axios from "axios";
import { getId } from "../../../utils/userData";
import { useEffect, useState } from "react";

export default function Newsletter() {
    const [isSelected, setIsSelected] = useState(false);
    const id = getId();

    
    const handleNewsletter = () => {
        axios.post("http://192.168.100.245:3001/settings/newsletterChange", {isSelected, id})
        .catch(err => console.log(err))
    }

    const reciveNewsletter = () => {
        axios.post("http://192.168.100.245:3001/settings/newsletter", {id})
        .then(response => setIsSelected(response.data.res[0].newsletter))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        reciveNewsletter()
    }, [])

    return (
        <Card className="h-[65px] mb-4">
        <CardBody className="flex flex-row justify-between">
            <Checkbox
            isSelected={isSelected} onValueChange={setIsSelected}>Chce otrymywać newslettera z nowościami</Checkbox>
            <Button color="primary" variant="flat" onClick={handleNewsletter}>Zapisz</Button>
        </CardBody>
        </Card>
    )
}