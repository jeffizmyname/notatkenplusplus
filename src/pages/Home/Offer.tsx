import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Offer() {
    return (
        <div className="mx-10 mb-[200px] flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[calc(300px*4+16px*3)]">
                <Card isBlurred shadow="md" className="bg-gray-950 lg:max-w-[300px]">
                    <CardHeader className="m-2 font-bold text-xl mb-0">Bogaty edytor tekstu</CardHeader>
                    <CardBody className="text-gray-500 pt-0">Dostosuj swoje notatki do swoich potrzeb od koloru tekstu do własnych grafik</CardBody>
                </Card>
                <Card isBlurred shadow="md" className="bg-gray-950 lg:max-w-[300px]">
                    <CardHeader className="m-2 font-bold text-xl mb-0">System kalendarza</CardHeader>
                    <CardBody className="text-gray-500 pt-0">Dzieki naszemu kalendarzowi juz nigdy nie zapomnisz o niczyich urodzinach</CardBody>
                </Card>
                <Card isBlurred shadow="md" className="bg-gray-950 lg:max-w-[300px]">
                    <CardHeader className="m-2 font-bold text-xl mb-0">Przyjazne UI</CardHeader>
                    <CardBody className="text-gray-500 pt-0">Intuicyjne i łatwe ui pomaga w obsłudze aplikacji zeby nigdzie się nie pogubić</CardBody>
                </Card>
                <Card isBlurred shadow="md" className="bg-gray-950 lg:max-w-[300px]">
                    <CardHeader className="m-2 font-bold text-xl mb-0">Kompatybilność</CardHeader>
                    <CardBody className="text-gray-500 pt-0">Nasza strona działa na komputerach laptopach tak samo jak i na urzadzeniach mobilnych</CardBody>
                </Card>
            </div>
        </div>
    )
}