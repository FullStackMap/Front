import { ConfirmMailDto } from '@FullStackMap/from-a2b';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import { AnoAuthController } from '../../services/BaseApi';

export const ConfirmMailPage = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams() as { token: string; mail: string };

  useEffect(() => {
    if (!queryParams.token || !queryParams.mail) navigate('/');
    confirmAccount();
  }, [queryParams]);

  const confirmAccount = async () => {
    const confirmMailDto: ConfirmMailDto = {
      token: queryParams.token,
      email: queryParams.mail,
    };
    const res = await AnoAuthController.confirmEmailPOST(confirmMailDto);
    console.log('🚀 ~ confirmAccount ~ res:', res);
  };

  return <></>;
};
