/* eslint-disable @typescript-eslint/no-explicit-any */
import useNotify, { NotifyDto } from '../hooks/useNotify';

const ErrorHandler = (error: any) => {
  const { ErrorNotify, NotifyMultipleErrors } = useNotify();
  const { response } = error;

  switch (response.status) {
    case 400: {
      const errors: NotifyDto[] = response.data?.map((error: any) => {
        return { title: undefined, message: error.message } as NotifyDto;
      });
      NotifyMultipleErrors(errors);
      break;
    }
    case 401:
      ErrorNotify({
        message:
          "Vous n'êtes pas autorisé à accéder à cette ressource. Veuillez vous connecter.",
      } as NotifyDto);
      break;
    case 403:
      ErrorNotify({
        message: "Vous n'êtes pas autorisé à accéder à cette ressource.",
      } as NotifyDto);
      break;
    case 404:
      ErrorNotify({
        message: "La ressource demandée n'a pas été trouvée.",
      } as NotifyDto);
      break;
    default:
      ErrorNotify({} as NotifyDto);
      break;
  }
};

export default ErrorHandler;
