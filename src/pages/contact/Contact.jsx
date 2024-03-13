import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:Dillane@toutix.com?subject=Contact%20Form%20Submission&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="min-h-screen p-4 bg-gray-200 sm:p-10 md:p-16 ">
      <div className="w-full max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md ">
        <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
        <p className="mb-6">Explore our Help Docs or contact our team.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="What can we help with?*"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
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
        </div>
      </div>
    </div>
  );
};

export default Contact;
