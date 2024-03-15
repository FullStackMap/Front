/* eslint-disable @typescript-eslint/no-explicit-any */
import useNotify, { ErrorNotify } from '../hooks/useNotify';

const ErrorHandler = (error: any) => {
  const { ErrorNotify, NotifyMultipleErrors } = useNotify();
  const { response } = error;

  switch (response.status) {
    case 400: {
      const errors: ErrorNotify[] = response.data?.map((error: any) => {
        return { title: undefined, message: error.message } as ErrorNotify;
      });
      console.log('🚀 ~ ErrorHandler ~ errors:', errors);
      NotifyMultipleErrors(errors);
      break;
    }
    case 401:
      ErrorNotify({
        message:
          "Vous n'êtes pas autorisé à accéder à cette ressource. Veuillez vous connecter.",
      } as ErrorNotify);
      break;
    case 403:
      ErrorNotify({
        message: "Vous n'êtes pas autorisé à accéder à cette ressource.",
      } as ErrorNotify);
      break;
    case 404:
      ErrorNotify({
        message: "La ressource demandée n'a pas été trouvée.",
      } as ErrorNotify);
      break;
    default:
      ErrorNotify({} as ErrorNotify);
      break;
  }
};

export default ErrorHandler;
