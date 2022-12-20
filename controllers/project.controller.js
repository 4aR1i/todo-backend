import Project from '../models/project.js';
import Task from '../models/task.js';

export const projectController = {
  async createProject(req, res) {
    try {
      const { title, color } = req.body;
      const project = new Project({ title, color });
      await project.save();
      return res.status(200).json(project);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  async getProjects(req, res) {
    try {
      const projects = await Project.find();
      return res.status(200).json(projects);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  async createTask(req, res) {
    try {
      const { number, title, description, priority, start, progress, project, color } = req.body;
      const task = new Task({ number, title, description, priority, start, progress, project, color });
      const projectCurrent = await Project.findOne({ _id: project });
      projectCurrent.tasks.push(task);
      await projectCurrent.save();
      return res.status(200).json(task);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  async getTasks(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Id not specified' });
      }
      const projects = await Project.findOne({ _id: id });
      return res.status(200).json(projects.tasks);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  async updateTask(req, res) {
    try {
      const task = req.body;
      const updateProject = await Project.findById({ _id: task.project });
      updateProject.tasks.splice(0, updateProject.tasks.length, ...updateProject.tasks.filter((item) => item._id != task._id));
      updateProject.tasks.push(task);
      await updateProject.save();
      return res.status(200).json(updateProject.tasks);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  async removeProject(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Id not specified' });
      }
      const project = await Project.findByIdAndDelete(id);
      return res.json(project);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  async removeTask(req, res) {
    try {
      const { projectId, id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Id not specified' });
      }
      const project = await Project.findOne({ _id: projectId });
      let task = project.tasks.find((item) => item._id == id);
      project.tasks.splice(0, project.tasks.length, ...project.tasks.filter((item) => item._id != id));
      await project.save();
      return res.json(task);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
