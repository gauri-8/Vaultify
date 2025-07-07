import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
        await axios.put(`https://vaultify-backend-peg2.onrender.com/projects/${editingId}`, newProject, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('https://vaultify-backend-peg2.onrender.com/projects', newProject, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    } catch (err) {
      console.error('Error deleting project:', err.message);
    }
  };

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900  text-white p-6">
        <h1 className="text-4xl font-bold mb-10 text-center">📁 My Projects</h1>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border font-semibold 
                ${filter === cat
                  ? 'bg-indigo-600 text-white'
                  : ' bg-gray-800 text-white'
                } hover:scale-105 transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Form */}
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-xl shadow-[0_0_18px_#4cb3dc5d]  ring-[#4cb3dc5d] backdrop-blur-sm  mb-12">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Project' : 'Add a New Project'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {['title', 'description', 'techStack', 'link', 'category'].map((field) => (
              <input
                key={field}
                name={field}
                value={newProject[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="p-2 border  rounded bg-gray-700 border-gray-600"
              />
            ))}
            <button
              onClick={handleCreateOrUpdate}
              className="bg-indigo-600 text-white font-bold px-4 py-2 rounded hover:bg-indigo-700"
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid ml-5 mt-8 mb- 6 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 transition"
            >
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-sm mb-2">{project.description}</p>
              <p className="text-xs  text-gray-300 mb-4">
                Tech: {project.techStack}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline text-sm font-medium"
              >
                View Project →
              </a>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-900">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectsPage;
