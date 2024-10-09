// src/components/Notes/AddNote.jsx
import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi from '../../common/SummaryApi';

const AddNote = ({ onAdd,onClose }) => {
    const [form, setForm] = useState({ title: '', content: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(SummaryApi.addNote.url, form, {
                withCredentials: true,
            });
            onAdd(res.data.note);
            setForm({ title: '', content: '' });
            onClose()
        } catch (error) {
            alert(error.response.data.message || 'Failed to add note');
        }
    };

    return (
        <div className="flex justify-center items-center h-fit my-2">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Note</h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Content:
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        value={form.content}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNote;
