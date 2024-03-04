import { useNavigate } from 'react-router-dom';
import './DefaultFooter.scss';

import { Container, Group, Text, Image, Title, Divider } from '@mantine/core';

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

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className="footer__link"
        href={link.link}
        pt={5}
        onClick={(event) => event.preventDefault()}>
        {link.label}
      </Text>
    ));

    return (
      <div key={group.title}>
        <Text className="footer__title">{group.title}</Text>
        {links}
      </div>
    );
  });

  const isMobile = window.innerWidth < 768;

  return (
    <>
      <Group className="footer" py={20}>
        <Container>
          <Image
            src="/public/vite.svg"
            alt="Logo du site"
            onClick={handleGoLandingPage}
            className="cursor-pointer"
            height={50}
            width={50}
          />
        </Container>
        <Divider
          size="md"
          orientation="vertical"
          display={isMobile ? 'none' : 'block'}
        />
        <Container className="footer__inner">{groups}</Container>
        <Divider
          size="md"
          orientation="vertical"
          display={isMobile ? 'none' : 'block'}
        />
        <Container>
          <Title className="cursor-pointer" onClick={handleGoLandingPage}>
            From A2B
          </Title>
        </Container>
      </Group>
    </>
  );
};

export default DefaultFooter;
