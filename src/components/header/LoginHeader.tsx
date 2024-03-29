import { Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const LoginHeader = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <>
      <Group h="100%" mx="50%">
        <img
          src="/logo.svg"
          alt="Logo du site"
          onClick={handleClickLogo}
          className="cursor-pointer"
        />
      </Group>
    </>
  );
};

export default LoginHeader;
