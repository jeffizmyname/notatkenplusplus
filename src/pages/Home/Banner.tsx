import { Button, Link } from "@nextui-org/react";
import PointRight from "../../assets/icons/PointRight";


export default function Banner() {
    return (
        <div className="flex items-center md:flex-col w-100% h-screen">
            <div className="xs:mx-10 md:mx-20 flex md:items-start sm:items-center justify-center flex-col w-100% h-[80%]">
                <h1 className="text-7xl my-10 md:mt-40">Zorganizuj się</h1>
                <p className="text-2xl text-foreground-300">Z łatwością zapisuj swoje pomysły i zadania aby o nich nie zapominec i mieć do nich dostęp w każdym miejscu</p>
                <Button as={Link} href="/register" className="mt-5" color="primary" size="lg">Zacznij Teraz <PointRight/></Button>
            </div>
        </div>
    )
}