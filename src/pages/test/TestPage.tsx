import { LoginDto } from '@FullStackMap/from-a2b';
import { useDocumentTitle } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AnoAuthController } from '../../services/BaseApi';

const TestPage = () => {
  useDocumentTitle('From A2B - Test');

  const mutation = useMutation({
    mutationFn: async (dto: LoginDto) =>
      await AnoAuthController.loginPOST(dto).then(() =>
        console.log('Logged in'),
      ),
    onSuccess: () => console.log('Success'),
  });

  useEffect(() => {
    mutation.mutate({
      email: 'antoine.capitain+MapPfe@gmail.com',
      password: 'NMdRx$HqyT8jX6',
    } as LoginDto);
  }, []);

  return <></>;
};

export default TestPage;
