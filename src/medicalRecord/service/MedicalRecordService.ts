// src/services/MedicalRecordService.ts
import { MedicalRecordRepository } from "../repositories/MedicalRecordRepository";
import { MedicalRecord } from "../models/MedicalRecord";
import { DateUtils } from "../../shared/utils/DateUtils";

export class MedicalRecordService {

    public static async getAllMedicalRecords(): Promise<MedicalRecord[]> {
        try {
            return await MedicalRecordRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener registros médicos: ${error.message}`);
        }
    }

    public static async getMedicalRecordById(medicalRecordId: number): Promise<MedicalRecord | null> {
        try {
            return await MedicalRecordRepository.findById(medicalRecordId);
        } catch (error: any) {
            throw new Error(`Error al encontrar registro médico: ${error.message}`);
        }
    }

    public static async addMedicalRecord(medicalRecord: MedicalRecord) {
        try {
            medicalRecord.created_at = DateUtils.formatDate(new Date());
            medicalRecord.updated_at = DateUtils.formatDate(new Date());
            return await MedicalRecordRepository.createMedicalRecord(medicalRecord);
        } catch (error: any) {
            throw new Error(`Error al crear registro médico: ${error.message}`);
        }
    }

    public static async modifyMedicalRecord(medicalRecordId: number, medicalRecordData: MedicalRecord) {
        try {
            const medicalRecordFound = await MedicalRecordRepository.findById(medicalRecordId);

            if (medicalRecordFound) {
                if (medicalRecordData.gender) {
                    medicalRecordFound.gender = medicalRecordData.gender;
                }
                if (medicalRecordData.weight) {
                    medicalRecordFound.weight = medicalRecordData.weight;
                }
                if (medicalRecordData.ideal_weight) {
                    medicalRecordFound.ideal_weight = medicalRecordData.ideal_weight;
                }
                if (medicalRecordData.deleted !== undefined) {
                    medicalRecordFound.deleted = medicalRecordData.deleted;
                }
            } else {
                return null;
            }

            medicalRecordFound.updated_by = medicalRecordData.updated_by;
            medicalRecordFound.updated_at = DateUtils.formatDate(new Date());
            return await MedicalRecordRepository.updateMedicalRecord(medicalRecordId, medicalRecordFound);
        } catch (error: any) {
            throw new Error(`Error al modificar registro médico: ${error.message}`);
        }
    }

    public static async deleteMedicalRecord(medicalRecordId: number): Promise<boolean> {
        try {
            return await MedicalRecordRepository.deleteMedicalRecord(medicalRecordId);
        } catch (error: any) {
            throw new Error(`Error al eliminar registro médico: ${error.message}`);
        }
    }

}
