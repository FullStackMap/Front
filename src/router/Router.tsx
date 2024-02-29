import { Route, Routes } from 'react-router-dom';
import HomeLayout from '../layout/header/HomeLayout';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import TestPage from '../pages/test/TestPage';

const Router = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
