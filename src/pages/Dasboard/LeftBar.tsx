import { Link } from "@nextui-org/react";

export default function LeftBar() {
    return (
        <div className="w-[15%] bg-background lg:block sm:hidden xs:hidden">
                <div className="flex flex-col my-2 ml-5">
                    <Link href="/Dashboard/Calendar">Kalendarz</Link>
                </div>
                <div className="flex flex-col my-2 ml-5">
                    <Link href="/Dashboard/BlankFiles">Notatki</Link>
                    <Link href="/Dashboard/PaintFiles">Płutna</Link>
                    <Link href="/Dashboard/ToDoFiles">Listy TODO</Link>
                    <Link href="/Dashboard/ChartFiles">Wykresy</Link>
                </div>
        </div>
    )
}