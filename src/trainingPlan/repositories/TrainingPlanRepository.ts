// src/repositories/TrainingPlanRepository.ts
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { TrainingPlan } from '../models/TrainingPlan';

export class TrainingPlanRepository {

  public static async findAll(): Promise<TrainingPlan[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM training_plan', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const trainingPlans: TrainingPlan[] = results as TrainingPlan[];
          resolve(trainingPlans);
        }
      });
    });
  }

  public static async findById(plan_id: number): Promise<TrainingPlan | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM training_plan WHERE plan_id = ?', [plan_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const trainingPlans: TrainingPlan[] = results as TrainingPlan[];
          if (trainingPlans.length > 0) {
            resolve(trainingPlans[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createTrainingPlan(trainingPlan: TrainingPlan): Promise<TrainingPlan> {
    const query = 'INSERT INTO training_plan (plan_description, plan_duration, result, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [trainingPlan.plan_description, trainingPlan.plan_duration, trainingPlan.result, trainingPlan.createdAt, trainingPlan.createdBy, trainingPlan.updatedAt, trainingPlan.updatedBy, trainingPlan.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdPlanId = result.insertId;
          const createdTrainingPlan: TrainingPlan = { ...trainingPlan, plan_id: createdPlanId };
          resolve(createdTrainingPlan);
        }
      });
    });
  }

  public static async updateTrainingPlan(plan_id: number, trainingPlan: TrainingPlan): Promise<TrainingPlan | null> {
    const query = 'UPDATE training_plan SET plan_description = ?, plan_duration = ?, result = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE plan_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [trainingPlan.plan_description, trainingPlan.plan_duration, trainingPlan.result, trainingPlan.updatedAt, trainingPlan.updatedBy, trainingPlan.deleted, plan_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedTrainingPlan: TrainingPlan = { ...trainingPlan, plan_id };
            resolve(updatedTrainingPlan);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteTrainingPlan(plan_id: number): Promise<boolean> {
    const query = 'DELETE FROM training_plan WHERE plan_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [plan_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }
}
