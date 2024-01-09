import {Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import React from "react";
import Account from "./Account";
import NoAccount from "./NoAccount"
import logo from "./logo.png"

//pan tu mnei react routera uzyj zerby mne to działało no tak ten tengo wiesz 

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar
            isBordered
            shouldHideOnScroll
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    {/* <p className="font-bold text-inherit">Notatki <sup>++</sup></p> */}
                    <img width={100} src={logo}/>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    {/* <p className="font-bold text-inherit">Notatki <sup>++</sup></p> */}
                    <img width={100} src={logo}/>
                </NavbarBrand>
            </NavbarContent>

            {sessionStorage.getItem("loggedIn") !== "true" ? <NoAccount/> : <Account/>}

        </Navbar>
    )
}
