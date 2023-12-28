import { NavbarContent, NavbarItem, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Button } from "@nextui-org/react";
import { ThemeChanger } from "../../components/ThemeChagner";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Account() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = sessionStorage.getItem("userData")
    let email = "";
    if (data !== null) {
        const jsonData = JSON.parse(data);
        email = jsonData.email
    }

    return (
        <NavbarContent as="div" justify="end">
            {location.pathname === "/" ? 
                        <NavbarItem>
                        <Button as={Link} color="primary" variant="flat" href="/dashboard">Dashboard</Button>
                        </NavbarItem>
                        : <></>}

            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="primary"
                        name="Jason Hughes"
                        size="md"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings"
                    onClick={() => {navigate("settings")}}>Settings</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={() => {sessionStorage.setItem("loggedIn", "false"); navigate("/")}}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <NavbarItem>
                <ThemeChanger />
            </NavbarItem>
        </NavbarContent>
    );
}