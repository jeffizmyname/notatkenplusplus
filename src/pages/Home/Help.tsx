import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import Parteon from "../../assets/icons/Parteon";
import Coffe from "../../assets/icons/Coffe";

export default function Help() {
    return (
        <div className=" mx-10 mb-[200px] flex flex-col md:flex-row lg:flex-row items-center justify-center md:gap-10 lg:gap-20">
            <div>
                <h1 className="text-6xl lg:text-8xl md:text-7xl font-bold text-center">Wspieraj Nas</h1>
                <p className="text-gray-500 text-md lg:text-xl text-center mt-5 max-w-lg sm:mb-10 xs:mb-10">Podoba ci się nasza praca Możesz wspomóc nas subskrybując naszego Patreona lub kup nam kawę</p>
            </div>
            <div className="flex flex-col gap-5">
                <Card isBlurred shadow="md" className="bg-gray-950 ">
                    <CardHeader className="m-2 mb-0 font-bold text-2xl">
                        <Parteon className="w-10 h-10 mr-5"/>
                        <Link href="https://patreon.com" size="lg" showAnchorIcon isExternal color="foreground">Patreon</Link>
                        </CardHeader>
                    <CardBody className="text-gray-500 pt-0">
                        Stałe wspieranie nas i rozwoju naszego projektu
                    </CardBody>
                </Card>
                <Card isBlurred shadow="md" className="bg-gray-950">
                    <CardHeader className="m-2 mb-0 font-bold text-2xl">
                        <Coffe className="w-10 h-10 mr-5"/>
                        <Link href="https://buymeacoffee.com" size="lg" showAnchorIcon isExternal color="foreground">Buy Me A Coffee</Link>
                        </CardHeader>
                    <CardBody className="text-gray-500 pt-0">
                        jednorazowa darowizna o wybranej kwocie
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}