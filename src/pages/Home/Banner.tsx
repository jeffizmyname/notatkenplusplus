

export default function Banner() {
    return (
        <div className="flex items-center md:flex-col w-100% h-screen">
            <div className="xs:mx-10 md:mx-20 flex md:items-start sm:items-center  flex-col w-100%">
                <h1 className="text-7xl my-10 md:mt-40">Zorganizuj się</h1>
                <p className="text-2xl text-foreground-300">Z łatwością zapisuj swoje pomysły i zadania aby o nich nie zapominec i mieć do nich dostęp w każdym miejscu</p>
            </div>
        </div>
    )
}