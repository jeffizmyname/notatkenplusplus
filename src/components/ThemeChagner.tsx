import React from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@nextui-org/react'
import { SunIcon } from '../assets/icons/SunIcon'
import { MoonIcon } from '../assets/icons/MoonIcon'

export const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()
    const [isSelected, setIsSelected] = React.useState(theme == 'light' ? true : false);

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
        </div>
    )
}