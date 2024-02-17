import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import DefaultLayout from '../layout/header/DefaultLayout';
import TestPage from '../pages/test/TestPage';

const Router = () => {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/test" element={<TestPage />} />
			</Route>

			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
};

export default Router;
