import React from 'react';

const features = [
  {
    title: 'Quick Legal Funding',
    description: 'Apply in minutes and get connected with funding options fast.',
  },
  {
    title: 'Verified Attorney Network',
    description: 'Work with trusted legal professionals across the country.',
  },
  {
    title: 'Secure Application Process',
    description: 'Your data is protected with enterprise-level security.',
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Why Choose Us?
      </h2>
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
