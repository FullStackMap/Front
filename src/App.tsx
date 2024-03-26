import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useEffect } from 'react';
import Router from './router/Router';
import { useAuthStore } from './store/useAuthStore';
import './styles.scss';

export default function App() {
  const { loadUser } = useAuthStore();
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}
