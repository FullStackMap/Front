import { Badge } from '@mantine/core';
import { useNetwork } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import useNotify from '../../hooks/useNotify';

export const OfflineComponent = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { SuccessNotify, ErrorNotify } = useNotify();
  const { online: isOnline } = useNetwork();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    if (!isPageLoaded) return;

    if (isOnline)
      return SuccessNotify({
        autoClose: 5000,
        message: 'Vous être a nouveau en ligne',
        title: 'En ligne !',
      });

    return ErrorNotify({
      autoClose: 5000,
      message: 'Certaine fonctionnalités pourrais ne plus être disponible',
      title: 'Oups ! Il semblerais que vous soyez a présent hors linge',
    });
  }, [isOnline]);

  return (
    <>
      {!isOnline && (
        <Badge variant="dot" color="red" size="lg" style={{ color: '#e03131' }}>
          Offline
        </Badge>
      )}
    </>
  );
};
