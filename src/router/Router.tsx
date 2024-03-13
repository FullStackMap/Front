import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/default/DefaultLayout';
import { HalfMapLayout } from '../layout/halfMap/HalfMapLayout';
import LoginLayout from '../layout/login/LoginLayout';
import { LandingPage } from '../pages/landing/LandingPage';
import { LoginPage } from '../pages/login/LoginPage';
import { RegisterPage } from '../pages/register/RegisterPage';
import { TripsPage } from '../pages/test/TripsPage';
import FeedbackPage from '../pages/feedback/FeedbackPage';
import CguPage from '../pages/cgu/CguPage';
import FaqPage from '../pages/faq/FaqPage';
import ContactPage from '../pages/contact/ContactPage';
import { AuthStore, useAuthStore } from '../store/useAuthStore';
import { PrivateRoute } from './PrivateRoute';

const Router = () => {
  const loadUser: () => void = useAuthStore((s: AuthStore) => s.loadUser);
  useEffect(() => loadUser(), []);

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/trips"
          element={
            <PrivateRoute
              authRequired
              redirectPath="/login"
              element={<TripsPage />}
            />
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/cgu" element={<CguPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
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
      </Route>
    </Routes>
  );
};

export default Router;
