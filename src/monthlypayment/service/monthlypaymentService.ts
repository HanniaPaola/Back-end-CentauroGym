import { MonthlypaymentRepository } from '../repositories/monthlypaymentRepository';
import { Monthlypayment } from '../models/monthlypayment';

export class MonthlypaymentService {
  public static async getAllMonthlypayments(): Promise<Monthlypayment[]> {
    try {
      return await MonthlypaymentRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener mensualidades: ${error.message}`);
    }
  }

  public static async getMonthlypaymentById(monthly_payment_id: number): Promise<Monthlypayment | null> {
    try {
      return await MonthlypaymentRepository.findById(monthly_payment_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar la mensualidad: ${error.message}`);
    }
  }

  public static async addMonthlypayment(monthlypayment: Monthlypayment): Promise<Monthlypayment> {
    try {
      monthlypayment.created_at = new Date(); 
      monthlypayment.updated_at = new Date();
      
      return await MonthlypaymentRepository.createMonthlypayment(monthlypayment);
    } catch (error: any) {
      throw new Error(`Error al crear la mensualidad: ${error.message}`);
    }
  }

  public static async modifyMonthlypayment(monthly_payment_id: number, monthlypaymentData: Monthlypayment): Promise<Monthlypayment | null> {
    try {
      const existingMonthlypayment = await MonthlypaymentRepository.findById(monthly_payment_id);

      if (existingMonthlypayment) {
        if (monthlypaymentData.user_id !== undefined) {
          existingMonthlypayment.user_id = monthlypaymentData.user_id;
        }
        if (monthlypaymentData.precio !== undefined) {
          existingMonthlypayment.precio = monthlypaymentData.precio;
        }
        if (monthlypaymentData.package !== undefined) {
          existingMonthlypayment.package = monthlypaymentData.package;
        }
        if (monthlypaymentData.coach !== undefined) {
          existingMonthlypayment.coach = monthlypaymentData.coach;
        }
        if (monthlypaymentData.created_by !== undefined) {
          existingMonthlypayment.created_by = monthlypaymentData.created_by;
        }
        if (monthlypaymentData.updated_by !== undefined) {
          existingMonthlypayment.updated_by = monthlypaymentData.updated_by;
        }
        existingMonthlypayment.updated_at = new Date(); 

        return await MonthlypaymentRepository.updateMonthlypayment(monthly_payment_id, existingMonthlypayment);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al actualizar la mensualidad: ${error.message}`);
    }
  }

  public static async deleteMonthlypayment(monthly_payment_id: number): Promise<boolean> {
    try {
      return await MonthlypaymentRepository.deleteMonthlypayment(monthly_payment_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar la mensualidad: ${error.message}`);
    }
  }
}
