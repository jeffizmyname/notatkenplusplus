import { NavbarContent, NavbarItem, Button, Link } from "@nextui-org/react";

export default function Account() {
    return (
        <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
            <Link href="/login">Zaloguj się</Link>
        </NavbarItem>
        <NavbarItem>
            <Button as={Link} color="primary" variant="flat" href="/register">
                Zarejestruj się
            </Button>
        </NavbarItem>
    </NavbarContent>
    );
}