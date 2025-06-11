import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
        Legal Funding Made Simple
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Connect with attorneys and access legal funding options tailored to your needs.
      </p>
      <a
        href="/apply"
        className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
        >
        Apply Now
      </a>

    </section>
  );
};

export default Hero;
