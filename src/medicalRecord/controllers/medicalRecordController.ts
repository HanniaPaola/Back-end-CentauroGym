// src/controllers/MedicalRecordController.ts
import { Request, Response } from 'express';
import { MedicalRecordService } from '../service/MedicalRecordService';

export const getMedicalRecords = async (_req: Request, res: Response) => {
    try {
        const medicalRecords = await MedicalRecordService.getAllMedicalRecords();
        if (medicalRecords) {
            res.status(200).json(medicalRecords);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicalRecordById = async (req: Request, res: Response) => {
    try {
        const medicalRecord = await MedicalRecordService.getMedicalRecordById(parseInt(req.params.medical_record_id, 10));
        if (medicalRecord) {
            res.status(200).json(medicalRecord);
        } else {
            res.status(404).json({ message: 'No se encontró el registro médico' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createMedicalRecord = async (req: Request, res: Response) => {
    try {
        const newMedicalRecord = await MedicalRecordService.addMedicalRecord(req.body);
        if (newMedicalRecord) {
            res.status(201).json(newMedicalRecord);
        } else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMedicalRecord = async (req: Request, res: Response) => {
    try {
        const updatedMedicalRecord = await MedicalRecordService.modifyMedicalRecord(parseInt(req.params.medical_record_id, 10), req.body);
        if (updatedMedicalRecord) {
            res.status(200).json(updatedMedicalRecord);
        } else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedicalRecord = async (req: Request, res: Response) => {
    try {
        const deleted = await MedicalRecordService.deleteMedicalRecord(parseInt(req.params.medical_record_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Registro médico eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Registro médico no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};





