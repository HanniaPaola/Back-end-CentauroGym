// src/repositories/MedicalRecordRepository.ts
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { MedicalRecord } from '../models/MedicalRecord';

export class MedicalRecordRepository {

    public static async findAll(): Promise<MedicalRecord[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM medical_record', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicalRecords: MedicalRecord[] = results as MedicalRecord[];
                    resolve(medicalRecords);
                }
            });
        });
    }

    public static async findById(medical_record_id: number): Promise<MedicalRecord | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM medical_record WHERE medical_record_id = ?', [medical_record_id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicalRecords: MedicalRecord[] = results as MedicalRecord[];
                    if (medicalRecords.length > 0) {
                        resolve(medicalRecords[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createMedicalRecord(medicalRecord: MedicalRecord): Promise<MedicalRecord> {
        const query = 'INSERT INTO medical_record (gender, weight, ideal_weight, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.execute(query, [medicalRecord.gender, medicalRecord.weight, medicalRecord.ideal_weight, medicalRecord.created_at, medicalRecord.created_by, medicalRecord.updated_at, medicalRecord.updated_by, medicalRecord.deleted], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    const createdMedicalRecordId = result.insertId;
                    const createdMedicalRecord: MedicalRecord = { ...medicalRecord, medical_record_id: createdMedicalRecordId };
                    resolve(createdMedicalRecord);
                }
            });
        });
    }

    public static async updateMedicalRecord(medical_record_id: number, medicalRecordData: MedicalRecord): Promise<MedicalRecord | null> {
        const query = 'UPDATE medical_record SET gender = ?, weight = ?, ideal_weight = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE medical_record_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [medicalRecordData.gender, medicalRecordData.weight, medicalRecordData.ideal_weight, medicalRecordData.updated_at, medicalRecordData.updated_by, medicalRecordData.deleted, medical_record_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        const updatedMedicalRecord: MedicalRecord = { ...medicalRecordData, medical_record_id: medical_record_id };
                        resolve(updatedMedicalRecord);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteMedicalRecord(medical_record_id: number): Promise<boolean> {
        const query = 'DELETE FROM medical_record WHERE medical_record_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [medical_record_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        resolve(true); // Eliminación exitosa
                    } else {
                        resolve(false); // Si no se encontró el registro a eliminar
                    }
                }
            });
        });
    }

}
