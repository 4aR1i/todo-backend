import { Router } from 'express';
import { projectController } from '../controllers/project.controller.js';

const router = new Router();

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getProjects);
router.post('/projects/tasks', projectController.createTask);
router.get('/projects/tasks/:id', projectController.getTasks);
router.put('/projects/', projectController.updateTask);
router.delete('/projects/:id', projectController.removeProject);
router.delete('/projects/:projectId/tasks/:id', projectController.removeTask);

export default router;
