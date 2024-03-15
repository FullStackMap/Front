import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export type ErrorNotify = {
  title: string | undefined;
  message: string | undefined;
  autoClose: number | undefined;
};

const useNotify = () => {
  const defaultErrorTitle = "Une erreur s'est produite";
  const defaultErrorMessage = 'Merci de réessayer plus tard';
  const defaultAutoClose = 5000;

  const ErrorNotify = (error: ErrorNotify) => {
    notifications.show({
      title: error.title || defaultErrorTitle,
      message: error.message || defaultErrorMessage,
      color: 'red',
      icon: <IconX />,
      autoClose: error.autoClose || defaultAutoClose,
    });
  };

  const NotifyMultipleErrors = (errors: ErrorNotify[]) => {
    errors.forEach((error, index) => {
      error.autoClose = 7000;
      setTimeout(() => {
        ErrorNotify(error);
      }, 200 * index);
    });
  };

  return { ErrorNotify, NotifyMultipleErrors };
};

export default useNotify;
