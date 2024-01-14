import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        navigate('/login');
        // ...
      })
      .catch((error) => {
        setError(error.message); // ..
      });
  };
  return (
    <main>
      <section>
        <div>
          <div>
            <h1> FocusApp </h1>
            <form>
              <div>
                <label htmlFor="email-address">
                  Email address
                  <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
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
                    label="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </label>
              </div>

              <button type="submit" onClick={onSubmit}>
                Sign up
              </button>
            </form>
            {error ? <p>{error}</p> : null}
            <p>
              Already have an account?
              {' '}
              <NavLink to="/">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
