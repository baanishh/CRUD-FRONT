import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AddNote from './AddNote';
import EditNote from './EditNote';
import axios from 'axios';
const backendDomain="https://crud-back-zvr6.onrender.com";

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const { user } = useContext(AuthContext);
    const [editingNote, setEditingNote] = useState(null);
    const [show,setShow]=useState(false)

    const fetchNotes = async () => {
       
        try {
            const res = await axios.get(`${backendDomain}/api/notes`, {
                withCredentials: true,
            });
            setNotes(res.data.notes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotes();
        } else {
            setNotes([]);
        }
    }, [user]);

    const handleAddNote = (note) => {
        setNotes([note, ...notes]);
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
    
        try {
            await axios.delete(`${backendDomain}/api/notes/${id}`, {
                withCredentials: true,
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
            alert(error.response?.data?.message || 'Failed to delete note');
        }
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
    };

    const handleUpdateNote = (updatedNote) => {
        setNotes(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)));
        setEditingNote(null);
    };

    const handleCancelEdit = () => {
        setEditingNote(null);
    };

    if (!user) {
        return <p className="text-center text-red-500">Please login to view your notes.</p>;
    }

    const handleClose=()=>{
        setShow(pre=>!pre)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 ">
            {show &&
               <div className='absolute inset-0 w-full flex justify-center items-center bg-slate-100 bg-opacity-35'>
                <div>
                <AddNote onAdd={handleAddNote} onClose={handleClose}/>
                </div>
                 
               </div>
            }
            <div className='p-5'>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300" onClick={handleClose}>ADD NOTES</button>
            </div>
            {editingNote && (
                <EditNote
                    note={editingNote}
                    onUpdate={handleUpdateNote}
                    onCancel={handleCancelEdit}
                />
            )}
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">{user.username}</h2>
            {notes.length === 0 ? (
                <p className="text-center text-gray-500">No notes available.</p>
            ) : (
                <ul className="space-y-4">
                    {notes.map(note => (
                        <li key={note._id} className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm ">
                            <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
                            <p className="text-gray-600">{note.content}</p>
                            <small className="block text-gray-500 mt-2">{new Date(note.createdAt).toLocaleString()}</small>
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={() => handleEditNote(note)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteNote(note._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotesList;
