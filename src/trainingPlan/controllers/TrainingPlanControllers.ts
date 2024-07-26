// src/controllers/trainingPlanController.ts
import { Request, Response } from 'express';
import { TrainingPlanService } from '../service/TrainingPlanService';

export const getTrainingPlans = async (_req: Request, res: Response) => {
  try {
    const trainingPlans = await TrainingPlanService.getAllTrainingPlans();
    if (trainingPlans) {
      res.status(200).json(trainingPlans);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainingPlanById = async (req: Request, res: Response) => {
  try {
    const trainingPlan = await TrainingPlanService.getTrainingPlanById(parseInt(req.params.plan_id, 10));
    if (trainingPlan) {
      res.status(200).json(trainingPlan);
    } else {
      res.status(404).json({ message: 'No se encontró el plan de entrenamiento' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTrainingPlan = async (req: Request, res: Response) => {
  try {
    const newTrainingPlan = await TrainingPlanService.addTrainingPlan(req.body);
    if (newTrainingPlan) {
      res.status(201).json(newTrainingPlan);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTrainingPlan = async (req: Request, res: Response) => {
  try {
    const updatedTrainingPlan = await TrainingPlanService.modifyTrainingPlan(parseInt(req.params.plan_id, 10), req.body);
    if (updatedTrainingPlan) {
      res.status(200).json(updatedTrainingPlan);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTrainingPlan = async (req: Request, res: Response) => {
  try {
    const deleted = await TrainingPlanService.deleteTrainingPlan(parseInt(req.params.plan_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó el plan de entrenamiento.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
