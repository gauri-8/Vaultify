// controllers/projectController.js
import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const project = new Project({ ...req.body, userId: req.user.id });
    await project.save();
    res.status(201).json(project); //for created project 201
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated)
       return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) 
      return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
