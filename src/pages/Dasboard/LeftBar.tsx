import { Link } from "@nextui-org/react";

export default function LeftBar() {
    return (
        <div className="w-[15%] bg-background lg:block sm:hidden xs:hidden">
                <div className="flex flex-col my-2 mx-5 mb-5">
                    <Link className="bg-gray-900 hover:bg-slate-900 px-4 py-2 rounded-md" href="/Dashboard/Calendar">Kalendarz</Link>
                </div>
                <div className="flex flex-col my-2 mx-5 gap-2">
                    <Link className="bg-gray-900 hover:bg-slate-900 px-4 py-2 rounded-md" href="/Dashboard/BlankFiles">Notatki</Link>
                    <Link className="bg-gray-900 hover:bg-slate-900 px-4 py-2 rounded-md" href="/Dashboard/ToDoFiles">Listy TODO</Link>
                    <Link className="bg-gray-900 hover:bg-slate-900 px-4 py-2 rounded-md" href="/Dashboard/PaintFiles">Płutna</Link>
                    <Link className="bg-gray-900 hover:bg-slate-900 px-4 py-2 rounded-md" href="/Dashboard/ChartFiles">Wykresy</Link>
                </div>
        </div>
    )
}