import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import DefaultFooter from '../../components/footer/DefaultFooter'
import DefaultHeader from '../../components/header/DefaultHeader'

const DefaultLayout = () => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header>
        <DefaultHeader burgerOpened={opened} toggleBurgerState={toggle} />
      </AppShell.Header>

      <AppShell.Main>
        <div>
          <Outlet />
        </div>
      </AppShell.Main>
      <AppShell.Footer>
        <DefaultFooter />
      </AppShell.Footer>
    </AppShell>
  )
}

export default DefaultLayout
