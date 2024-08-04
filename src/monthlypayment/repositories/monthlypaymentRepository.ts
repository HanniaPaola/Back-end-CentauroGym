import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Monthlypayment } from '../models/monthlypayment';

export class MonthlypaymentRepository {

  public static async findAll(): Promise<Monthlypayment[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM monthlypayment', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const monthlypayments: Monthlypayment[] = results as Monthlypayment[];
          resolve(monthlypayments);
        }
      });
    });
  }

  public static async findById(monthly_payment_id: number): Promise<Monthlypayment | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM monthlypayment WHERE monthly_payment_id = ?', [monthly_payment_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const monthlypayments: Monthlypayment[] = results as Monthlypayment[];
          if (monthlypayments.length > 0) {
            resolve(monthlypayments[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createMonthlypayment(monthlypayment: Monthlypayment): Promise<Monthlypayment> {
    const query = 'INSERT INTO monthlypayment (user_id, precio, package, coach, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [ monthlypayment.user_id, monthlypayment.precio, monthlypayment.package, monthlypayment.coach, monthlypayment.created_by, monthlypayment.created_at, monthlypayment.updated_by, monthlypayment.updated_at, monthlypayment.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdMonthlypaymentId = result.insertId;
          const createdMonthlypayment: Monthlypayment = { ...monthlypayment, monthly_payment_id: createdMonthlypaymentId };
          resolve(createdMonthlypayment);
        }
      });
    });
  }

  public static async updateMonthlypayment(monthly_payment_id: number, monthlypaymentData: Monthlypayment): Promise<Monthlypayment | null> {
    const query = 'UPDATE monthlypayment SET user_id = ?, precio = ?, package = ?, coach = ?, created_by = ?, created_at = ?, updated_by = ?, updated_at = ?, deleted = ? WHERE monthly_payment_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [monthlypaymentData.user_id, monthlypaymentData.precio, monthlypaymentData.package, monthlypaymentData.coach, monthlypaymentData.created_by, monthlypaymentData.created_at, monthlypaymentData.updated_by, monthlypaymentData.updated_at, monthlypaymentData.deleted, monthly_payment_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedMonthlypayment: Monthlypayment = { ...monthlypaymentData, monthly_payment_id };
            resolve(updatedMonthlypayment);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteMonthlypayment(monthly_payment_id: number): Promise<boolean> {
    const query = 'DELETE FROM monthlypayment WHERE monthly_payment_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [monthly_payment_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
