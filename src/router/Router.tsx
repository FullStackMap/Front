import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import DefaultLayout from '../layout/default/DefaultLayout';
import TestPage from '../pages/test/TestPage';
import LoginLayout from '../layout/login/LoginLayout';

const Router = () => {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/test" element={<TestPage />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Route>

			<Route element={<LoginLayout />}>
				<Route path="/login" element={<LoginPage />} />
			</Route>
		</Routes>
	);
};

export default Router;
