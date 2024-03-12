import React from 'react';

const Contact = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
      <p className="mb-6">Explore our Help Docs or contact our team.</p>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email address*"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6">
        <textarea
          placeholder="What can we help with?*"
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Send
      </button>
      <div className="mt-8">
        <div className="text-sm">
          <p>Toutix</p>
          <p>
            Department of Mathematical Sciences & Department of Computer
            Sciennce, Venture Lab
          </p>
          <p>07437343463</p>
          <p>Durham DH1 3LE</p>
        </div>
        <div className="mt-4 text-sm">
          <p>Brand Assets</p>
          <p>Logos, screenshots, and more.</p>
          <a href="#" target="_blank" className="text-blue-500">
            Get them here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
