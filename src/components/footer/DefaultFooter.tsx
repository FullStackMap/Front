import { useNavigate } from 'react-router-dom';
import './DefaultFooter.scss';

import { Container, Divider, Group, Text } from '@mantine/core';

const data = [
  {
    title: 'Voyages',
    links: [
      { label: 'Planifiez votre voyage', link: '#' },
      { label: 'Avis', link: '#' },
    ],
  },
  {
    title: 'Votre compte',
    links: [
      { label: 'Voire mon profil', link: '#' },
      { label: 'Mes voyages', link: '#' },
      { label: 'CGU', link: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Nous contacter', link: '#' },
      { label: 'FAQ', link: '#' },
    ],
  },
];

const DefaultFooter = () => {
  const Navigate = useNavigate();

  const handleGoLandingPage = () => {
    Navigate('/');
  };

  const groups = data.map(group => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className="link"
        component="a"
        href={link.link}
        onClick={event => event.preventDefault()}>
        {link.label}
      </Text>
    ));

    return (
      <div className="wrapper" key={group.title}>
        <Text className="title">{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <>
      <Group h="100%" className="footerContainer">
        <Container>
          <img
            src="/public/vite.svg"
            alt="Logo du site"
            onClick={handleGoLandingPage}
            className="cursor-pointer"
          />
        </Container>
        <Divider orientation="vertical" />
        <Container className="inner">{groups}</Container>
        <Divider orientation="vertical" />
        <Container>
          <h2
            className="cursor-pointer webSiteName"
            onClick={handleGoLandingPage}>
            From A2B
          </h2>
        </Container>
      </Group>
    </>
  );
};

export default DefaultFooter;
