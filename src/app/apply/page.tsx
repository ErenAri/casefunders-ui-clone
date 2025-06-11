'use client';

import React, { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    caseType: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/apply', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccessMessage(
        `Application successfully submitted by ${formData.name} (${formData.email})`
      );
      setFormData({ name: '', email: '', caseType: '', message: '' });
    } else {
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Apply for Legal Funding</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-800 border border-green-300 p-4 mb-6 rounded w-full max-w-md text-sm">
          <strong>Success:</strong> {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          className="w-full border border-gray-300 rounded p-2"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          className="w-full border border-gray-300 rounded p-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          type="email"
          required
        />
        <select
          className="w-full border border-gray-300 rounded p-2"
          name="caseType"
          value={formData.caseType}
          onChange={handleChange}
          required
        >
          <option value="">Select Case Type</option>
          <option value="Personal Injury">Personal Injury</option>
          <option value="Employment">Employment</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      <button
        onClick={() => (window.location.href = '/')}
        className="mt-6 text-blue-600 underline hover:text-blue-800 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
}
