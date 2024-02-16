import './styles.css';
import '@mantine/core/styles.css';
import Router from './router/Router';

export default function App() {
	return (
		<div className="App">
			{/* Default Layout */}
			<Router />
		</div>
	);
}
