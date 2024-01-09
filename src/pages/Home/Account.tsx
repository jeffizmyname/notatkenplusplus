import { NavbarContent, NavbarItem, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Button } from "@nextui-org/react";
import { useNavigate, useLocation } from 'react-router-dom';
import { getPfp } from "../../utils/getProfilePic";
import { getId } from "../../utils/userData";
import { useEffect, useState } from "react";

export default function Account() {
    const [image, setimage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const location = useLocation();
    const id = getId();

    useEffect(() => {
        getPfp(id, setimage);
    }, [id]);

    const data = sessionStorage.getItem("userData")
    let email = "";
    let name = "";
    let surname = "";

    if (data !== null) {
        const jsonData = JSON.parse(data);
        email = jsonData.email
        name = jsonData.name
        surname = jsonData.surname
    }

    return (
        <NavbarContent as="div" justify="end">
            {location.pathname === "/" ? 
                        <NavbarItem>
                        <Button as={Link} color="primary" variant="flat" href="/dashboard/Calendar">Dashboard</Button>
                        </NavbarItem>
                        : <></>}

            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="primary"
                        name={`${name} ${surname}`}
                        size="md"
                        src={image}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Zalogowany jako</p>
                        <p className="font-semibold">{email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings"
                    onClick={() => {location.pathname == "/" ? navigate("/dashboard/settings") : navigate("settings")}}>Ustawienia</DropdownItem>
                    <DropdownItem key="help_and_feedback">Pomoc i Opinia</DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={() => {sessionStorage.setItem("loggedIn", "false"); navigate("/")}}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    );
}