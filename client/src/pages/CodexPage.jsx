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
      const res = await axios.get("http://localhost:5000/api/notes", {
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
        // UPDATE
        await axios.put(`http://localhost:5000/api/notes/${editingId}`, note, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        // CREATE
        await axios.post("http://localhost:5000/api/notes", note, {
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
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
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
      <Footer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-[#f7c1df] dark:bg-gray-900 text-gray-800 dark:text-white"></div>

      <div className="mx-3 md:container md:mx-auto my-8 rounded-xl p-5 bg-white dark:bg-gray-800 text-white min-h-[80vh] md:w-[60%]">
        <h1 className="font-bold text-center text-4xl">📓 Vaultify Codex - Save Your Learnings</h1>
        <div className="mt-5 w-44 h-1 mx-auto bg-indigo-600 rounded-full"></div>

        <div className="addNote my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold m-5">{editingId ? "✏️ Edit Note" : "Add a Note"}</h2>

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
            className="bg-indigo-600 hover:bg-indigo-700 p-3 py-2 text-sm font-bold text-white rounded-md w-fit self-end"
          >
            {editingId ? "💾 Update Note" : "➕ Save Note"}
          </button>
        </div>

        <hr className="my-6" />

        <h2 className="text-2xl mx-5 font-bold">Your Notes</h2>

        <div className="notes grid gap-6 mt-10 md:grid-cols-2">
          {notes.length === 0 && <p className="m-5">No notes yet. Start adding some!</p>}
          {Array.isArray(notes) && notes.map((n) => (
            <div key={n._id} className="bg-white p-4 rounded-md shadow-md border border-gray-800">
              <h3 className="font-bold text-black text-lg">{n.title}</h3>
              <p className="mt-2 text-gray-800">{n.content}</p>
              <div className="flex justify-end mt-4 gap-2">
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

                <p className="mt-2 text-sm text-gray-500">
  {new Date(n.createdAt).toLocaleDateString()} • {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CodexPage;
