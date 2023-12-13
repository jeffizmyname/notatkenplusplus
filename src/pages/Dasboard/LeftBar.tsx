import { Link } from "@nextui-org/react";

export default function LeftBar() {
    return (
        <div className="h-full w-[15%] bg-background">
            <div className="flex flex-col my-2 ml-5">
                <Link href="/Dashboard/MyThings">Moje Rzeczy</Link>
                <Link href="/Dashboard/Calendar">Kalendarz</Link>
            </div>
            <div className="flex flex-col my-2 ml-5">
                <Link href="/Dashboard/Blank">Nowa Notatka</Link>
                <Link href="/Dashboard/Paint">Nowe Płutno</Link>
                <Link href="/Dashboard/ToDo">Nowa Lista TODO</Link>
                <Link href="/Dashboard/Chart">Nowy Wykres</Link>
            </div>

        </div>
    )
}