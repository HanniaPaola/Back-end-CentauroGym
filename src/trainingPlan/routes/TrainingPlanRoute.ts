// src/routes/trainingPlanRoutes.ts
import { Router } from 'express';
import {getTrainingPlans, getTrainingPlanById, createTrainingPlan, updateTrainingPlan, deleteTrainingPlan} from '../controllers/TrainingPlanControllers';

const router = Router();

router.get('/', getTrainingPlans);
router.get('/:plan_id', getTrainingPlanById);
router.post('/', createTrainingPlan);
router.put('/:plan_id', updateTrainingPlan);
router.delete('/:plan_id', deleteTrainingPlan);

export default router;

