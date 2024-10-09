import React, { useState } from 'react';
import axios from 'axios';
const backendDomain="http://localhost:5005";

const EditNote = ({ note, onUpdate, onCancel }) => {
    const [form, setForm] = useState({ title: note.title, content: note.content });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Check the form data and note ID
        console.log('Form data:', form);
        console.log('Note ID:', note._id);

        const res = await axios.put(`${backendDomain}/api/notes/${note._id}`, form, {
            withCredentials: true, // To send cookies
        });

        console.log('Update successful:', res.data); // Log the successful response
        onUpdate(res.data.note);
    } catch (error) {
        console.error('Error details:', error); // Log the entire error object
        console.error('Error response:', error.response); // Log the response from the server
        alert(error.response?.data?.message || 'Failed to update note');
    }
};


    return (
        <form onSubmit={handleSubmit} className="border border-blue-500 p-6 mb-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Edit Note</h3>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Content:</label>
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
            </div>
            <div className="flex justify-between items-center">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Update
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditNote;
