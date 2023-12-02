import { NavbarContent, NavbarItem, Button, Link } from "@nextui-org/react";
import { ThemeChanger } from "../../components/ThemeChagner";

export default function Account() {
    return (
        <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
            <Button as={Link} color="primary" variant="flat" href="/register">
                Sign Up
            </Button>
        </NavbarItem>
        <NavbarItem>
            <ThemeChanger />
        </NavbarItem>
    </NavbarContent>
    );
}