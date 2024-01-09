import { Card, CardHeader, Link } from "@nextui-org/react";
import Discord from "../../assets/icons/Discord";
import Instagram from "../../assets/icons/Instagram";
import Twitter from "../../assets/icons/Twitter";


export default function Comunity() {
    return (
        <div className="mb-[200px]">
            <h1 className="text-6xl lg:text-8xl md:text-7xl font-bold text-center">Nasza społeczność</h1>
            <p className="text-gray-500 text-md lg:text-xl text-center mt-5">Masz jakieś pytania lub sugestie. Wszyscy są tu mile widziani!</p>
            <div className="flex flex-row justify-center gap-4 mx-5 my-6">
                <Card isBlurred shadow="md" className="flex flex-row bg-gray-950">
                    <CardHeader className="font-bold text-2xl">
                        <Discord className=" m-0 lg:block md:block sm:block xs:hidden lg:mr-2 md:mr-2 sm:mr-2"/>
                        <Link href="https://discord.com" size="lg" showAnchorIcon isExternal color="primary">Discord</Link>
                    </CardHeader>
                </Card>
                <Card isBlurred shadow="md" className="flex flex-row bg-gray-950">
                    <CardHeader className="font-bold text-2xl">
                        <Instagram className=" m-0 lg:block md:block sm:block xs:hidden lg:mr-2 md:mr-2 sm:mr-2"/>
                        <Link href="https://instagram.com" size="lg" showAnchorIcon isExternal color="warning">Instagram</Link>
                    </CardHeader>
                </Card>
                <Card isBlurred shadow="md" className="flex flex-row bg-gray-950">
                    <CardHeader className="font-bold text-2xl">
                        <Twitter className=" m-0 lg:block md:block sm:block xs:hidden lg:mr-2 md:mr-2 sm:mr-2"/>
                        <Link href="https://x.com" size="lg" showAnchorIcon isExternal color="foreground">Twitter</Link>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}