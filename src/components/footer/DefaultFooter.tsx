import { useNavigate } from 'react-router-dom';
import './DefaultFooter.scss';

import { Container, Group, Text, Image, Title, Divider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const data = [
  {
    title: 'Voyages',
    links: [
      { label: 'Planifiez votre voyage', url: '#' },
      { label: 'Avis', url: '/feedback' },
    ],
  },
  {
    title: 'Votre compte',
    links: [
      { label: 'Voir mon profil', url: '/profile' },
      { label: 'Mes voyages', url: '#' },
      { label: 'CGU', url: '/cgu' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Nous contacter', url: '/contact' },
      { label: 'FAQ', url: '/faq' },
    ],
  },
];

const DefaultFooter = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleGoLandingPage = () => {
    navigate('/');
  };

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className="footer__link"
        pt={5}
        onClick={() => navigate(link.url)}>
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

  return (
    <>
      <Group className="footer" py={20}>
        <Container>
          <Image
            src="/vite.svg"
            alt="Logo du site"
            onClick={handleGoLandingPage}
            className="cursor-pointer"
            height={50}
            width={50}
          />
        </Container>
        {!isMobile && <Divider size="md" orientation="vertical" />}
        <Container className="footer__inner">{groups}</Container>
        {!isMobile && <Divider size="md" orientation="vertical" />}
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
