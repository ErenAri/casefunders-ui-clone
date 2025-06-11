'use client';

import { useEffect, useState } from 'react';
import { convertToCSV, downloadCSV } from '@/utils/exportCsv';

interface Submission {
  name: string;
  email: string;
  caseType: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Submission>>({});

  const fetchSubmissions = async () => {
    const res = await fetch('/api/apply');
    const data = await res.json();
    setSubmissions(data.submissions || []);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (index: number) => {
    await fetch(`/api/apply/${index}`, { method: 'DELETE' });
    fetchSubmissions();
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData(submissions[index]);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (index: number) => {
    await fetch(`/api/apply/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });
    setEditingIndex(null);
    fetchSubmissions();
  };

  const handleExport = () => {
    if (submissions.length === 0) return;
    const csv = convertToCSV(
      submissions.map((s) => ({ ...s } as Record<string, string | number | boolean | null | undefined>))
    );

    downloadCSV(csv);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Admin Panel</h1>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Export to CSV
          </button>
        </div>

        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Case Type</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 align-top">
                  {editingIndex === i ? (
                    <>
                      <td className="border p-2">
                        <input
                          name="name"
                          value={editData.name || ''}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          name="email"
                          value={editData.email || ''}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          name="caseType"
                          value={editData.caseType || ''}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <textarea
                          name="message"
                          value={editData.message || ''}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border p-2 space-x-2">
                        <button
                          onClick={() => handleEditSubmit(i)}
                          className="text-green-600 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="text-gray-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{s.name}</td>
                      <td className="border p-2">{s.email}</td>
                      <td className="border p-2">{s.caseType}</td>
                      <td className="border p-2">{s.message}</td>
                      <td className="border p-2 space-x-2">
                        <button
                          onClick={() => handleEdit(i)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
