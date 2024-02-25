import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/default/DefaultLayout';
import LoginLayout from '../layout/login/LoginLayout';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import TestPage from '../pages/test/TestPage';
import { HalfMapLayout } from '../layout/halfMap/HalfMapLayout';

const Router = () => {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Route>

			<Route element={<HalfMapLayout />}>
				<Route path="/test" element={<TestPage />} />
			</Route>

			<Route element={<LoginLayout />}>
				<Route path="/login" element={<LoginPage />} />
			</Route>
		</Routes>
	);
};

export default Router;
