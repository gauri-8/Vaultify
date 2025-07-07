import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const CodexPage = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("vaultifyToken");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://vaultify-backend-peg2.onrender.com/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSaveNote = async () => {
    if (!note.title || !note.content) return;

    try {
      if (editingId) {
        await axios.put(`https://vaultify-backend-peg2.onrender.com/api/notes/${editingId}`, note, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post("https://vaultify-backend-peg2.onrender.com/api/notes", note, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setNote({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err.message);
    }
  };

  const handleEdit = (note) => {
    setNote({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://vaultify-backend-peg2.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="absolute inset-0 -z-10 h-full w-full  bg-gray-900  text-white" />

      <div className="max-w-6xl w-full mx-auto px-4 md:px-10 my-10  bg-gray-800 text-white rounded-xl min-h-[80vh]">
        <h1 className="text-2xl md:text-4xl font-bold text-center">📓 Vaultify Codex - Save Your Learnings</h1>
        <div className="mt-4 w-32 h-1 mx-auto bg-indigo-600 rounded-full" />

        {/* Add/Edit Note */}
        <div className="addNote my-8 flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold">{editingId ? "✏️ Edit Note" : "Add a Note"}</h2>

          <input
            type="text"
            name="title"
            placeholder="Note Title"
            value={note.title}
            onChange={handleChange}
            className="w-full rounded-md px-5 py-2 text-black bg-white border"
          />

          <textarea
            name="content"
            placeholder="Note Content"
            value={note.content}
            onChange={handleChange}
            className="w-full rounded-md px-5 py-3 text-black bg-white border"
          />

          <button
            onClick={handleSaveNote}
            className="bg-indigo-600 hover:bg-indigo-700 p-2 px-4 text-sm font-bold text-white rounded-md self-end"
          >
            {editingId ? "💾 Update Note" : "➕ Save Note"}
          </button>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Notes List */}
        <h2 className="text-xl md:text-2xl font-bold mb-4">Your Notes</h2>

       <div className="notes grid gap-6 mt-10 sm:grid-cols-1 md:grid-cols-2">
  {notes.length === 0 && <p className="m-5">No notes yet. Start adding some!</p>}

  {Array.isArray(notes) &&
    notes.map((n) => (
      <div
        key={n._id}
        className="bg-[#2c3142] text-white p-5 rounded-xl shadow-md flex flex-col justify-between transition-all hover:shadow-lg"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold">{n.title}</h3>
          <p className="text-sm text-gray-300">{n.content}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4">
          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(n)}
              className="bg-indigo-600 hover:bg-indigo-700 p-2 text-white rounded-md"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(n._id)}
              className="bg-indigo-600 hover:bg-indigo-700 p-2 text-white rounded-md"
            >
              <AiFillDelete />
            </button>
          </div>

          {/* Timestamp */}
          <p className="text-xs text-gray-400 sm:text-right">
            {new Date(n.createdAt).toLocaleDateString()} •{" "}
            {new Date(n.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    ))}
</div>
      </div>
      <Footer />
    </>
  );
};

export default CodexPage;
