import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/default/DefaultLayout';
import { HalfMapLayout } from '../layout/halfMap/HalfMapLayout';
import LoginLayout from '../layout/login/LoginLayout';
import { ForgotPasswordPage } from '../pages/forgotPassword/ForgotPasswordPage';
import { LandingPage } from '../pages/landing/LandingPage';
import { LoginPage } from '../pages/login/LoginPage';
import ProfilePage from '../pages/profile/ProfilePage.tsx';
import { RegisterPage } from '../pages/register/RegisterPage';
import TestPage from '../pages/test/TestPage';
import { AuthStore, useAuthStore } from '../store/useAuthStore';
import { PrivateRoute } from './PrivateRoute';
import { ConfirmMailPage } from '../pages/confirmMail/ConfirmMailPage';

const Router = () => {
  const loadUser: () => void = useAuthStore((s: AuthStore) => s.loadUser);
  useEffect(() => loadUser(), []);

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              authRequired
              redirectPath="/login"
              element={<ProfilePage />}
            />
          }
        />
      </Route>

      <Route element={<HalfMapLayout />}></Route>

      <Route element={<LoginLayout />}>
        <Route
          path="/login"
          element={
            <PrivateRoute
              authRequired={false}
              redirectPath="/"
              element={<LoginPage />}
            />
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute
              authRequired={false}
              redirectPath="/"
              element={<RegisterPage />}
            />
          }
        />
        <Route
          path="/confirmMail"
          element={
            <PrivateRoute
              authRequired={false}
              redirectPath="/"
              element={<ConfirmMailPage />}
            />
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <PrivateRoute
              authRequired={false}
              redirectPath="/"
              element={<ForgotPasswordPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
