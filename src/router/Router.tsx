import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/default/DefaultLayout';
import HalfMapLayout from '../layout/halfMap/HalfMapLayout.tsx';
import LoginLayout from '../layout/login/LoginLayout';
import ShowTravelsLayout from '../layout/showTravels/ShowTravelsLayout.tsx';
import LandingPage from '../pages/landing/LandingPage.tsx';
import LoginPage from '../pages/login/LoginPage.tsx';
import RegisterPage from '../pages/register/RegisterPage.tsx';
import HistoryPage from '../pages/showTravels/history/HistoryPage.tsx';
import MyTrips from '../pages/showTravels/myTrips/MyTrips.tsx';
import StatisticsPage from '../pages/showTravels/statistics/StatisticsPage.tsx';
import { AuthStore, useAuthStore } from '../store/useAuthStore';
import { PrivateRoute } from './PrivateRoute';

const Router = () => {
  const loadUser: () => void = useAuthStore((s: AuthStore) => s.loadUser);
  useEffect(() => loadUser(), []);

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
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

      <Route
        path="/trips"
        element={
          <PrivateRoute
            authRequired
            redirectPath="/login"
            element={<ShowTravelsLayout />}
          />
        }>
        <Route path="" element={<MyTrips />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
