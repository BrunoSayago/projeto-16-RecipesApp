import React, { useState, useEffect } from 'react';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Fonte: https://pt.stackoverflow.com/a/276022
  const validateEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  useEffect(() => {
    const validateLogin = () => {
      const minCharacters = 6;
      const passwordIsValid = userPassword.length > minCharacters;
      const emailIsValid = validateEmail(userEmail);
      if (emailIsValid && passwordIsValid) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };
    validateLogin();
  }, [userEmail, userPassword]);

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
      //
    }
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
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
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
