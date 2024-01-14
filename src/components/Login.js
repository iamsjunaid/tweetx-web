import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        navigate('/home');
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        setError(error.message);
      });
  };

  return (
    <>
      <main>
        <section>
          <div>
            <p> FocusApp </p>

            <form>
              <div>
                <label htmlFor="email-address">
                  Email address
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="password">
                  Password
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            </form>
            {error ? <p>{error}</p> : null}

            <p className="text-sm text-white text-center">
              No account yet?
              {' '}
              {' '}
              <NavLink to="/signup">
                Sign up
              </NavLink>
            </p>

          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
