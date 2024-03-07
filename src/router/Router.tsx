import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/default/DefaultLayout';
import { HalfMapLayout } from '../layout/halfMap/HalfMapLayout';
import LoginLayout from '../layout/login/LoginLayout';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import ShowTravelsLayout from "../layout/showTravels/ShowTravelsLayout.tsx";
import HistoryPage from "../pages/showTravels/history/HistoryPage.tsx";

const Router = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>

      <Route element={<HalfMapLayout />}></Route>

      <Route element={<LoginLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

        <Route element={<ShowTravelsLayout />}>
            <Route path="/voyages/historique" element={<HistoryPage />} />
        </Route>

    </Routes>
  );
};

export default Router;
