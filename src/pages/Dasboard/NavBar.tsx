import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Account from "../Home/Account";

export default function NavBar() {
    return (
        <Navbar
        position="static">
            <Account/>
        </Navbar>
    )
}