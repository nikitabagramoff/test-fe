import React, {ChangeEvent, useState} from 'react';
import { Button, TextField } from '@material-ui/core';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import AuthAPI from '../../api/AuthAPI';
import './styles.css';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<null | boolean>(null);

  const onEmailChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const areInputsValid = (): boolean => {
    const emailError = !isValidEmail(email);
    const passwordError = !isValidPassword(password);
    setEmailError(emailError);
    setPasswordError(passwordError);
    return !emailError && !passwordError;
  }

  const onLogin = async (): Promise<void> => {
    setRequestError(null);
    if (!areInputsValid()) {
      return;
    }
    try {
      const response = await AuthAPI.login(email, password);
      setRequestError(false);
      alert(response.message);
    } catch (e) {
      setRequestError(true);
    }
  };

  return (
    <div className="login-form__container">
      <TextField
        value={email}
        onChange={onEmailChange}
        error={emailError}
        helperText={emailError ? 'Invalid email' : null}
        className="login-form__input"
        label="Email"
        variant="outlined"
      />
      <TextField
        type="password"
        value={password}
        onChange={onPasswordChange}
        error={passwordError}
        helperText={passwordError ? 'Invalid password' : null}
        className="login-form__input"
        label="Password"
        variant="outlined"
      />
      <Button
        onClick={onLogin}
        className="login-form__button"
        variant="contained"
        color="primary">
        LOG IN
      </Button>
      {
        requestError && <p className="login-form__error">Invalid credentials</p>
      }
      <p></p>
    </div>
  );
}

export default LoginForm;
