import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

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
        toast.success("Note updated!");
        setEditingId(null);
      } else {
        await axios.post("https://vaultify-backend-peg2.onrender.com/api/notes", note, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Note saved!");
      }

      setNote({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      toast.error("Failed to save note");
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
      toast.success("Note deleted");
      fetchNotes();
    } catch (err) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 h-full w-full  bg-gray-900  text-white" />
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl top-[-100px] left-[-150px] animate-blob1"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-500 via-indigo-500 to-purple-500 opacity-20 rounded-full blur-2xl bottom-[-80px] right-[-120px] animate-blob2"></div>
      

      <div className="max-w-6xl w-full mx-auto px-4 md:px-10 my-10 text-white rounded-xl min-h-[80vh] relative z-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center">📓 Vaultify Codex - Save Your Learnings</h1>
        <div className="mt-4 w-32 h-1 mx-auto bg-indigo-600 rounded-full" />

        {/* Add/Edit Note Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="addNote my-8 p-6 rounded-xl cursor-pointer bg-white/5 backdrop-blur-md border border-indigo-400/20 shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-bold">{editingId ? "✏️ Edit Note" : "Add a Note"}</h2>

          <input
            type="text"
            name="title"
            placeholder="Note Title"
            value={note.title}
            onChange={handleChange}
            className="w-full rounded-md px-5 py-2 mt-3 cursor-pointer bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            name="content"
            placeholder="Note Content"
            value={note.content}
            onChange={handleChange}
            className="w-full rounded-md px-5 py-3 mt-3 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSaveNote}
            className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 px-4 py-2 mt-4 text-sm font-bold text-white rounded-md float-right"
          >
            {editingId ? "💾 Update Note" : "➕ Save Note"}
          </button>
        </motion.div>

        <hr className="my-6 border-gray-700" />

        <h2 className="text-xl md:text-2xl font-bold mb-4">Your Notes</h2>

        <div className="notes grid gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2">
          {notes.length === 0 && <p className="m-5 text-gray-400">No notes yet. Start adding some!</p>}

          {notes.map((n, index) => (
            <motion.div
              key={n._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#2c3142] text-white p-5 rounded-xl shadow-md flex flex-col justify-between transition-all hover:shadow-indigo-600 hover:scale-[1.01] cursor-pointer group"
            >
              <div className="flex flex-col gap-1 max-h-40 overflow-hidden group-hover:max-h-full transition-all duration-500 ease-in-out">
                <h3 className="text-lg font-bold">{n.title}</h3>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{n.content}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(n);
                    }}
                    className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 p-2 text-white rounded-md"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(n._id);
                    }}
                    className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 p-2 text-white rounded-md"
                  >
                    <AiFillDelete />
                  </button>
                </div>

                <p className="text-xs text-gray-400 sm:text-right">
                  {new Date(n.createdAt).toLocaleDateString()} •{" "}
                  {new Date(n.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default CodexPage;
