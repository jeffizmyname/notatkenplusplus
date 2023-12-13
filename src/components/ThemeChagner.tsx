import React from 'react'
import { useTheme } from 'next-themes'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Switch } from '@nextui-org/react'
import { SunIcon } from '../assets/icons/SunIcon'
import { MoonIcon } from '../assets/icons/MoonIcon'

export const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()
    const [isSelected, setIsSelected] = React.useState(theme == 'light' ? true : false);

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    function chagne(keys) {
        setIsSelected(theme == 'light' ? true : false)
        setSelectedKeys(keys)
    }

    return (
        <div className=''>
            <Switch
                defaultSelected
                color='primary'
                isSelected={isSelected}
                onValueChange={setIsSelected}
                onClick={isSelected ? () => setTheme('dark') : () => setTheme('light')}
                thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                        <SunIcon className={className} />
                    ) : (
                        <MoonIcon className={className} />
                    )
                }>
            </Switch>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                        variant="flat"
                        isIconOnly>
                    {selectedValue == "dark" ? <MoonIcon/> : <SunIcon/>}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedKeys}
                onSelectionChange={setIsSelected}>
                    <DropdownItem key="dark">
                        Dark
                    </DropdownItem>
                    <DropdownItem key="light">
                        Light
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}