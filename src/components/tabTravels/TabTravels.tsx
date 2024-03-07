import { Tabs } from '@mantine/core';

const  TabTravels = ()=> {
    return (
        <Tabs defaultValue="first">
            <Tabs.List>
                <Tabs.Tab value="first">First tab</Tabs.Tab>
                <Tabs.Tab value="second">Second tab</Tabs.Tab>
                <Tabs.Tab value="third">Third tab</Tabs.Tab>
            </Tabs.List>
        </Tabs>
    );
}
export default TabTravels;