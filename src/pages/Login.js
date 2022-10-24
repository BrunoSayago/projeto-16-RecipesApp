import React from 'react';

function Login() {
  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        name="emailInput"
        placeholder="Email"
      />
      <input
        type="password"
        data-testid="password-input"
        name="passwordInput"
        placeholder="Password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
