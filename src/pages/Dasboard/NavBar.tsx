import { Link, Navbar, NavbarContent, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import Account from "../Home/Account";
import { useState } from "react";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        position="static">
            <NavbarContent className="lg:hidden sm:block xs:block">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>
            <Account/>
            <NavbarMenu>
                <div className="flex flex-col my-2 ml-5">
                    <Link href="/Dashboard/MyThings">Moje Rzeczy</Link>
                    <Link href="/Dashboard/Calendar">Kalendarz</Link>
                </div>
                <div className="flex flex-col my-2 ml-5">
                    <Link href="/Dashboard/BlankFiles">Notatki</Link>
                    <Link href="/Dashboard/PaintFiles">Płutna</Link>
                    <Link href="/Dashboard/ToDoFiles">Listy TODO</Link>
                    <Link href="/Dashboard/ChartFiles">Wykresy</Link>
                </div>
            </NavbarMenu>
        </Navbar>
    )
}