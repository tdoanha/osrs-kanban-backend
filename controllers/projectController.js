// controllers/projectController.js

const Project = require("../models/projectModel");

const projectController = {
  // Create a new project
  createProject: async (req, res) => {
    try {
      const { title, project_description, created_by } = req.body;
      const created_on = new Date();
      const newProject = await Project.createProject(
        title,
        project_description,
        created_on,
        created_by,
      );
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      res
        .status(500)
        .json({ message: "Create Project: Internal server error" });
    }
  },

  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error("Error getting projects:", error);
      res
        .status(500)
        .json({ message: "getAllProjects: Internal server error" });
    }
  },

  // Get a project by ID
  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.getProjectById(id);
      res.status(200).json(project);
    } catch (error) {
      console.error("Error getting project by ID:", error);
      res
        .status(500)
        .json({ message: "getProjectById: Internal server error" });
    }
  },

  // Update a project
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        project_description,
        created_by,
        completed_on,
        completed_by,
      } = req.body;
      const updatedProject = await Project.updateProject(
        id,
        title,
        project_description,
        created_by,
        completed_on,
        completed_by,
      );
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "updateProject: Internal server error" });
    }
  },

  // Delete a project
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await Project.deleteProject(id);
      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(204).end(); // 204 No Content
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "deleteProject: Internal server error" });
    }
  },
};

module.exports = projectController;
