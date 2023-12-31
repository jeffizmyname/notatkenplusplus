import { Input } from "@nextui-org/react";

export default function Code() {
    return (
        <div className="flex sm:flex-col md:flex-col lg:flex-row flex-col h-screen items-center">
            <div className="lg:w-1/2 sm:h-1/2 xs:mx-5 md:mx-10 md:text-center sm:text-center">
                <h1 className="text-6xl my-10">Chcesz podzielić się z kimś swoją pracą?</h1>
                <p className="text-2xl">łatwe udostepnianie danych za pomocą systemu kodów udostępninia</p>
            </div>
            <div className="lg:w-1/2 sm-1/2 xs:mx-10 md:mx-20">
                <p className="text-4xl my-10">Czy masz kod?</p>
                <Input
                label="Twój kod"
                placeholder="np. ABCD123"/>
            </div>
        </div>
    )
}