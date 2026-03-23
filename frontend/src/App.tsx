import { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  // O estado 'isLogged' começa verificando se já existe um login salvo
  const [isLogged, setIsLogged] = useState(() => {
    return localStorage.getItem('guelcos_session') === 'true';
  });

  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem('guelcos_session', 'true');
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('guelcos_session');
  };

  // Se NÃO estiver logado, mostra a tela de Login
  // Se ESTIVER logado, mostra o Dashboard
  return (
    <>
      {isLogged ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;