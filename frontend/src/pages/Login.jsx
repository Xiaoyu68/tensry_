import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      navigate('/', { replace: true });
    },
    [navigate]
  );

  return (
    <div className="login">
      <div className="login__card">
        <header className="login__header">
          <h1 className="login__title">Login to Account</h1>
          <p className="login__subtitle">
            Login to save your history and personal settings
          </p>
        </header>

        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__field">
            <span className="login__label">Email</span>
            <input
              className="login__input"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              onInvalid={(event) =>
                event.target.setCustomValidity('Please enter a valid email address.')
              }
              onInput={(event) => event.target.setCustomValidity('')}
            />
          </label>

          <label className="login__field">
            <span className="login__label">Password</span>
            <input
              className="login__input"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="login__actions">
            <button type="submit" className="login__button login__button--primary">
              Login
            </button>
            <button type="button" className="login__button">
              Login with Third Party
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
