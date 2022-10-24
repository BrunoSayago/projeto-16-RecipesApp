import React, { useState } from 'react';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Só pro lint parar de reclamar.
  console.log(setButtonDisabled);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'emailInput':
      setUserEmail(value);
      break;
    case 'passwordInput':
      setUserPassword(value);
      break;
    default:
      return true;
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        name="emailInput"
        placeholder="Email"
        value={ userEmail }
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        name="passwordInput"
        placeholder="Password"
        value={ userPassword }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
