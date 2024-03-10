import { Navigate, useLocation } from 'react-router-dom'
import { AuthStore, useAuthStore } from '../store/useAuthStore'

export type PrivateRouteProps = {
  authRequired: boolean
  redirectPath: string
  element: JSX.Element
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const isLogged: () => boolean = useAuthStore((s: AuthStore) => s.isLogged)
  const location = useLocation()

  if (
    (props.authRequired && !isLogged()) ||
    (!props.authRequired && isLogged())
  ) {
    return (
      <Navigate to={props.redirectPath} replace state={{ from: location }} />
    )
  }

  return props.element
}
