
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from "react-hot-toast";

const categories = ['All', 'Frontend', 'Full Stack', 'Mini'];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('vaultifyToken');
      const res = await axios.get('https://vaultify-backend-peg2.onrender.com/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async () => {
    const token = localStorage.getItem('vaultifyToken');
    try {
      if (editingId) {
        await axios.put(
          `https://vaultify-backend-peg2.onrender.com/projects/${editingId}`,
          newProject,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Project Edited!");
      } else {
        await axios.post(
          'https://vaultify-backend-peg2.onrender.com/projects',
          newProject,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Project Added!");
      }
      
      setNewProject({ title: '', description: '', techStack: '', link: '', category: '' });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error('Error submitting project:', err.message);
    }
  };

  const handleEdit = (project) => {
    setNewProject(project);
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('vaultifyToken');
    try {
      await axios.delete(`https://vaultify-backend-peg2.onrender.com/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
      toast.success("Project Deleted!");
    } catch (err) {
      console.error('Error deleting project:', err.message);
    }
  };

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <Navbar />
       <div className="relative min-h-screen bg-gray-900 text-white px-6 md:px-12 py-10 overflow-hidden">
        {/* Dynamic floating background blobs */}
     
      
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
  <div className="absolute w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-blob1 top-[-10%] left-[10%]" />
  <div className="absolute w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-blob2 top-[30%] left-[70%]" />
  <div className="absolute w-60 h-60 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob3 top-[60%] left-[30%]" />
</div>

        <h1 className="text-4xl animate-float font-bold mb-10 text-center">📁 My Projects</h1>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border cursor-pointer font-semibold 
                ${filter === cat ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-white'} 
                hover:scale-105 transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Form */}
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-xl shadow-[0_0_18px_#4cb3dc5d] ring-[#4cb3dc5d] backdrop-blur-sm mb-12">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Project' : 'Add a New Project'}</h2>
          <div className="grid grid-cols-1 gap-4">
           {['title', 'description', 'techStack', 'link', 'category'].map((field) =>
  field === 'category' ? (
    <select
      key={field}
      name={field}
      value={newProject[field]}
      onChange={handleInputChange}
      className="p-2 border rounded bg-gray-700 border-gray-600 text-white"
    >
      <option value="">Select Category</option>
      <option value="Frontend">🎨 Frontend</option>
      <option value="Full Stack">🧩 Full Stack</option>
      <option value="Mini">🔧 Mini</option>
    </select>
  ) : (
    <input
      key={field}
      name={field}
      value={newProject[field]}
      onChange={handleInputChange}
      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      className="p-2 border rounded bg-gray-700 border-gray-600"
    />
  )
)}

            <button
              onClick={handleCreateOrUpdate}
              className="bg-indigo-600 text-white cursor-pointer font-bold px-4 py-2 rounded hover:bg-indigo-700"
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="relative cursor-pointer bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-xl shadow-[0_0_18px_#4cb3dc5d] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Floating Emoji */}
              <div className="absolute top-4 right-4 text-3xl opacity-70 animate-float">
                {project.category === 'Frontend' && '🎨'}
                {project.category === 'Full Stack' && '🧩'}
                {project.category === 'Mini' && '🔧'}
                {project.category === 'All' && '💻'}
              </div>

              <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>
              <p className="text-sm mb-2 text-gray-300">{project.description}</p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 my-3">
                {project.techStack.split(',').map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-semibold text-indigo-200 bg-indigo-600/30 rounded-full backdrop-blur-sm border border-indigo-300/30"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline text-sm font-medium"
              >
                🔗 View Project →
              </a>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 bg-yellow-400 cursor-pointer text-white rounded hover:bg-yellow-500"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-3 py-1 bg-red-500 cursor-pointer text-white rounded hover:bg-red-700"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    </>
  );
};

export default ProjectsPage;
