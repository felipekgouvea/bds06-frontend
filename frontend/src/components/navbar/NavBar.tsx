import './NavBar.css';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from '../../util/auth';
import { useEffect } from 'react';
import { removeAuthData } from '../../util/storage';
import history from '../../util/history';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';

export default function NavBar() {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClique = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar bg-primary main-nav">
      <div className="navbar-container">
        <div className="navbar-logo">
          {authContextData.authenticated ? (
            <Link to="/movies">
              <h4>MovieFlix</h4>
            </Link>
          ) : (
            <Link to="/">
              <h4>MovieFlix</h4>
            </Link>
          )}
        </div>
        <div>
          {authContextData.authenticated ? (
            <button
              className="btn btn-primary navbar-btn"
              onClick={handleLogoutClique}
            >
              <span>SAIR</span>
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </nav>
  );
}
