import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const apiURL = 'api_url';
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    if(username.value === '') {
        setError('Please entre email');
        setLoading(false);
        return;
    }
    const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex.test(username.value))
    {
        setError(null);
        setLoading(true);
    } else {
        setError('Please enter valid email');
        setLoading(false);
        return;
    }

    if(password.value == '') {
        setError('Please enter a password');
        setLoading(false);
        return;
    }
    
    if (regexPassword.test(password.value)) {
        console.log("hi....");

        setError(`Please enter a valid password, it contains atleast one digit, 
                one small Eng word, 
                one eng Caps word, 
                and one special char
                and min 6 length`);
        setLoading(false);
        return;
    }
    return false;

    axios.post(`${apiURL}/login`, { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/author');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="email" required {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" required {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;