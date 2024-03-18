import { useEffect } from 'react';
import Router from './router/Router';
import { useAuthStore } from './store/useAuthStore';

import './styles.scss';
import '@mantine/dates/styles.css';

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
