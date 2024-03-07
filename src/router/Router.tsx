import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/default/DefaultLayout';
import { HalfMapLayout } from '../layout/halfMap/HalfMapLayout';
import LoginLayout from '../layout/login/LoginLayout';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import ShowTravelsLayout from "../layout/showTravels/ShowTravelsLayout.tsx";
import HistoryPage from "../pages/showTravels/history/HistoryPage.tsx";
import StatisticsPage from "../pages/showTravels/statistics/StatisticsPage.tsx";
import MyTrips from "../pages/showTravels/myTrips/MyTrips.tsx";

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

        <Route path="/voyages" element={<ShowTravelsLayout />}>
            <Route path="historique" element={<HistoryPage />} />
            <Route path="statistique" element={<StatisticsPage/>}/>
            <Route path="mesvoyages" element={<MyTrips/>}/>
        </Route>

    </Routes>
  );
};

export default Router;
