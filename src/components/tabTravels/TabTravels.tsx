import { Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const  TabTravels = ()=> {
    const navigate = useNavigate();
    return (
        <Tabs defaultValue="first">
            <Tabs.List>
                <Tabs.Tab value="first" onClick={()=>navigate('statistique')}>Statistiques</Tabs.Tab>
                <Tabs.Tab value="second" onClick={()=>navigate('mesvoyages')}>Mes Voyages</Tabs.Tab>
                <Tabs.Tab value="third" onClick={()=>navigate('historique')}>Historique</Tabs.Tab>
            </Tabs.List>
        </Tabs>
    );
}
export default TabTravels;