import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import React from "react";
import Account from "./Account";
import NoAccount from "./NoAccount"

//pan tu mnei react routera uzyj zerby mne to działało no tak ten tengo wiesz 

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        "Item 1",
        "item 2",
        "Item 3",
    ];
    return (
        <Navbar
            isBordered
            shouldHideOnScroll
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">Notatki <sup>++</sup></p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">Notatki <sup>++</sup></p>
                </NavbarBrand>
                <NavbarItem>
                    Item1
                </NavbarItem>
                <NavbarItem>
                    Item2
                </NavbarItem>
                <NavbarItem>
                    Item3
                </NavbarItem>
            </NavbarContent>

            {sessionStorage.getItem("loggedIn") !== "true" ? <NoAccount/> : <Account/>}

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
