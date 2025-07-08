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
        await axios.put(
          `https://vaultify-backend-peg2.onrender.com/projects/${editingId}`,
          newProject,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'https://vaultify-backend-peg2.onrender.com/projects',
          newProject,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
  <Navbar />
  <div className="min-h-screen bg-gray-900 text-white px-6 md:px-12 py-10">
    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold mb-2">🏆 Trophies & Milestones</h1>
      <p className="text-gray-400">A timeline of your developer growth journey</p>
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 px-5 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
      >
        ➕ Add Achievement
      </button>
    </div>

    {/* Certifications */}
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-6">📜 Certifications & Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.length ? (
          certifications.map((cert) => (
            <div key={cert._id} className="bg-gray-800 p-5 rounded-md shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-indigo-400 mb-2">{cert.title}</h3>
              <p><strong>Platform:</strong> {cert.platform}</p>
              <p><strong>Date:</strong> {cert.date.slice(0, 10)}</p>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noreferrer" className="text-indigo-300 underline mt-2 block">🔗 View Certificate</a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No certifications yet.</p>
        )}
      </div>
    </section>

    {/* Milestones */}
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-6">🕒 Milestones</h2>
      <div className="relative border-l-2 border-indigo-600 pl-6">
        {milestones.length ? (
          milestones.map((m) => (
            <div key={m._id} className="mb-6 relative">
              <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[8px] top-1.5"></div>
              <p className="text-sm text-gray-400">{m.date.slice(0, 10)}</p>
              <p className="text-base text-white font-medium">{m.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No milestones added.</p>
        )}
      </div>
    </section>

    {/* Hackathons */}
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-6">🏁 Hackathon Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.length ? (
          hackathons.map((hack) => (
            <div key={hack._id} className="bg-gray-800 p-5 rounded-md shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-indigo-400 mb-2">{hack.title}</h3>
              <p>📍 {hack.description}</p>
              <p className="text-sm text-gray-400 mt-1">📅 {hack.date.slice(0, 10)}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hackathons yet.</p>
        )}
      </div>
    </section>

    {/* Progress Track Inputs */}
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-4">📊 Track Your Progress</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input type="text" placeholder="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
        <input type="text" placeholder="LeetCode Username" value={leetcodeUsername} onChange={(e) => setLeetcodeUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
        <input type="text" placeholder="Codeforces Username" value={codeforcesUsername} onChange={(e) => setCodeForcesUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
        <input type="text" placeholder="CodeChef Username" value={codechefUsername} onChange={(e) => setCodeChefUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
      </div>
      <button onClick={handleSaveUsernames} className="mt-6 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">
        Save Usernames
      </button>
    </section>

    {/* GitHub Stats */}
    {githubUsername && (
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">📈 GitHub Stats</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <img src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=tokyonight`} alt="GitHub Stats" className="rounded-md shadow-md" />
          <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=tokyonight`} alt="Top Languages" className="rounded-md shadow-md" />
        </div>
      </section>
    )}

    {/* LeetCode Stats */}
    {leetcodeUsername && (
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">💻 DSA Progress</h2>
        <img src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=baloo&ext=activity`} alt="LeetCode Stats" className="rounded-md shadow-md" />
      </section>
    )}

    {/* Competitive Programming */}
    {(codeforcesUsername || codechefUsername) && (
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">⚔️ Competitive Programming</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {codeforcesUsername && (
            <div className="bg-gray-800 p-4 rounded-md shadow-md">
              <h4 className="text-xl font-semibold mb-2">📉 Codeforces Rating</h4>
              {cfRating ? <p className="text-green-400">Current Rating: {cfRating}</p> : <p className="text-gray-400">No contests found.</p>}
            </div>
          )}
          {codechefUsername && ccData && (
            <div className="bg-gray-800 p-4 rounded-md shadow-md">
              <h4 className="text-xl font-semibold mb-2">🍽️ CodeChef Stats</h4>
              <p>Rating: <span className="text-indigo-400">{ccData.rating}</span></p>
              <p>Stars: ⭐ {ccData.total_stars}</p>
            </div>
          )}
        </div>
      </section>
    )}

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Add New Achievement</h2>
          <div className="grid gap-3">
            <select name="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="bg-gray-800 p-2 rounded border border-gray-600">
              <option value="certification">Certification</option>
              <option value="milestone">Milestone</option>
              <option value="hackathon">Hackathon</option>
            </select>
            {form.type === 'certification' && (
              <>
                <input name="title" placeholder="Title" value={form.title} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="platform" placeholder="Platform" value={form.platform} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="link" placeholder="Certificate Link (optional)" value={form.link} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
              </>
            )}
            {form.type === 'milestone' && (
              <>
                <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <textarea name="description" placeholder="Milestone Description" value={form.description} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
              </>
            )}
            {form.type === 'hackathon' && (
              <>
                <input name="title" placeholder="Hackathon Title" value={form.title} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <textarea name="description" placeholder="Highlight or Summary" value={form.description} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
              </>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleAdd} className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">Save</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  <Footer />
</>

  );
};

export default ProjectsPage;
