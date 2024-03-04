import '@mantine/core/styles.css';
import { useEffect } from 'react';
import Router from './router/Router';
import { AuthStore, useAuthStore } from './store/useAuthStore';
import './styles.scss';

export default function App() {
  const loadUser: () => void = useAuthStore((s: AuthStore) => s.loadUser);

  useEffect(() => loadUser());
  return (
    <div className="App">
      <Router />
    </div>
  );
}
