import React from 'react';

const steps = [
  {
    title: 'Submit Application',
    description: 'Fill out a simple form to get started with your funding request.',
  },
  {
    title: 'Get Matched',
    description: 'We connect you with verified attorneys and funding options.',
  },
  {
    title: 'Receive Funds',
    description: 'Once approved, get access to the legal funds you need.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
        How It Works
      </h2>
      <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-blue-600 text-4xl font-bold mb-4">{index + 1}</div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
