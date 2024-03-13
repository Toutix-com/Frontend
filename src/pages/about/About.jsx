import React from 'react';

const About = () => {
  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">About Toutix</h1>
      <div className="text-lg">
        <p className="mb-4">
          Welcome to <span className="text-blue-500">Toutix</span>, your premier
          online ticket selling platform!
        </p>
        <h2 className="mb-2 text-xl font-semibold">Our Founders</h2>
        <p className="mb-6">
          Our company was founded by Dillane Wehebe, who serves as the CEO, and
          Daniel Zhang, who serves as the CTO. Both Dillane and Daniel are
          graduates of Durham University.
        </p>
        <h2 className="mb-2 text-xl font-semibold">Our Product</h2>
        <p>
          At <span className="text-blue-500">Toutix</span>, we provide an online
          marketplace for buying and selling tickets to various events. Whether
          you're looking for concert tickets, sports tickets, or tickets to
          other live events, we've got you covered. With our user-friendly
          interface and secure payment system, buying and selling tickets has
          never been easier.
        </p>
      </div>
    </div>
  );
};

export default About;
