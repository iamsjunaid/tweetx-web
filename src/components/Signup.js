import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import signupBanner from '../assets/img/signup_banner.svg';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [personName, setPersonName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(`/login/${personName}`);
      return true;
    } catch (error) {
      setError(error.message);
      return false; // Failure
    }
  };

  return (
    <section>
      <div className="ml-8 mt-8 text-pink-400 text-3xl font-semibold">
        <h1>TweetX</h1>
      </div>
      <div className="flex justify-between items-start h-screen">
        <div className="flex flex-col gap-4 w-1/2 px-8 mt-8">
          <form className="flex flex-col gap-8 w-3/4">
            <NavLink to="/" className="w-full text-left">
              <button type="submit" className="px-16 py-2 border border-gray-800 rounded-md font-bold">
                Login
              </button>
            </NavLink>
            <div>
              <input
                className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full p-4"
                id="name"
                name="name"
                type="text"
                label="Name"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                required
                placeholder="Name"
              />
            </div>

            <div>
              <input
                className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full p-4"
                id="email-address"
                name="email-address"
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>

            <div>
              <input
                className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full p-4"
                id="password"
                name="password"
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <div>
              <input
                className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full p-4"
                id="confirm-password"
                name="confirm-password"
                type="password"
                label="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
              />
            </div>
            <div className="w-full text-right font-bold">
              <NavLink to={`/login/${personName}`} className="px-8 py-4 bg-pink-400 text-white rounded-md" onClick={onSubmit}>
                Sign up
              </NavLink>
            </div>
          </form>
          {error ? <p>{error}</p> : null}

        </div>
        <div className="w-1/2 h-screen">
          <img src={signupBanner} className="object-fit contain object-center w-3/4" alt="sign_up_banner" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
