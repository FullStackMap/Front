import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/default/DefaultLayout';
import { HalfMapLayout } from '../layout/halfMap/HalfMapLayout';
import LoginLayout from '../layout/login/LoginLayout';
import { ConfirmMailPage } from '../pages/confirmMail/ConfirmMailPage';
import { ForgotPasswordPage } from '../pages/forgotPassword/ForgotPasswordPage';
import { LandingPage } from '../pages/landing/LandingPage';
import { LoginPage } from '../pages/login/LoginPage';
import ProfilePage from '../pages/profile/ProfilePage.tsx';
import MapPage from '../pages/map/MapPage';
import { RegisterPage } from '../pages/register/RegisterPage';
import FeedbackPage from '../pages/feedback/FeedbackPage';
import CguPage from '../pages/cgu/CguPage';
import FaqPage from '../pages/faq/FaqPage';
import ContactPage from '../pages/contact/ContactPage';
import { AuthStore, useAuthStore } from '../store/useAuthStore';
import { PrivateRoute } from './PrivateRoute';

const Router = () => {
  const loadUser: () => void = useAuthStore((s: AuthStore) => s.loadUser);
  useEffect(() => loadUser(), [loadUser]);

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/cgu" element={<CguPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/map" element={<MapPage />} />
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
