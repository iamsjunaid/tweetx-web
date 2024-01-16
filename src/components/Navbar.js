import React from 'react';

const Navbar = () => (
  <nav className="flex justify-around items-center px-12 py-4 shadow-md">
    <div className=" text-pink-400 text-3xl font-semibold">
      <h1>TweetX</h1>
    </div>
    <ul className="flex list-none justify-around gap-12">
      <li className="font-bold text-xl text-gray-500">Feed</li>
      <li className="font-bold text-xl text-gray-500">Users</li>
      <li className="font-bold text-xl text-gray-500">Profile</li>
    </ul>
  </nav>
);

export default Navbar;
