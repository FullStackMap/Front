import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

function SwitchThemeIcon() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
        >
            { localStorage.getItem('mantine-color-scheme-value') === 'light' ? <IconSun className="icon, light" stroke={1.5} fill="currentColor"/> : <IconMoon className="icon, dark" stroke={1.5}  />  }
        </ActionIcon>
    );
}

export default SwitchThemeIcon;