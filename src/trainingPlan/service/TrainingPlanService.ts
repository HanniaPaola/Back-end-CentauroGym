// src/services/TrainingPlanService.ts
import { TrainingPlanRepository } from '../repositories/TrainingPlanRepository';
import { TrainingPlan } from '../models/TrainingPlan';
import { DateUtils } from '../../shared/utils/DateUtils';

export class TrainingPlanService {

  public static async getAllTrainingPlans(): Promise<TrainingPlan[]> {
    try {
      return await TrainingPlanRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener planes de entrenamiento: ${error.message}`);
    }
  }

  public static async getTrainingPlanById(planId: number): Promise<TrainingPlan | null> {
    try {
      return await TrainingPlanRepository.findById(planId);
    } catch (error: any) {
      throw new Error(`Error al encontrar plan de entrenamiento: ${error.message}`);
    }
  }

  public static async addTrainingPlan(trainingPlan: TrainingPlan): Promise<TrainingPlan> {
    try {
      trainingPlan.createdAt = DateUtils.formatDate(new Date());
      trainingPlan.updatedAt = DateUtils.formatDate(new Date());
      return await TrainingPlanRepository.createTrainingPlan(trainingPlan);
    } catch (error: any) {
      throw new Error(`Error al crear plan de entrenamiento: ${error.message}`);
    }
  }

  public static async modifyTrainingPlan(planId: number, trainingPlanData: TrainingPlan): Promise<TrainingPlan | null> {
    try {
      const trainingPlanFinded = await TrainingPlanRepository.findById(planId);

      if (trainingPlanFinded) {
        if (trainingPlanData.plan_description) {
          trainingPlanFinded.plan_description = trainingPlanData.plan_description;
        }
        if (trainingPlanData.plan_duration) {
          trainingPlanFinded.plan_duration = trainingPlanData.plan_duration;
        }
        if (trainingPlanData.result) {
          trainingPlanFinded.result = trainingPlanData.result;
        }
        if (trainingPlanData.deleted !== undefined) {
          trainingPlanFinded.deleted = trainingPlanData.deleted;
        }
      } else {
        return null;
      }
      trainingPlanFinded.updatedBy = trainingPlanData.updatedBy;
      trainingPlanFinded.updatedAt = DateUtils.formatDate(new Date());
      return await TrainingPlanRepository.updateTrainingPlan(planId, trainingPlanFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar plan de entrenamiento: ${error.message}`);
    }
  }

  public static async deleteTrainingPlan(planId: number): Promise<boolean> {
    try {
      return await TrainingPlanRepository.deleteTrainingPlan(planId);
    } catch (error: any) {
      throw new Error(`Error al eliminar plan de entrenamiento: ${error.message}`);
    }
  }
}
