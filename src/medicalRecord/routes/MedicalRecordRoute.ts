// src/routes/MedicalRecordRoutes.ts
import express from 'express';
import {getMedicalRecords, getMedicalRecordById, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord} from '../controllers/medicalRecordController';

const router = express.Router();

router.get('/', getMedicalRecords);
router.get('/:medical_record_id', getMedicalRecordById);
router.post('/', createMedicalRecord);
router.put('/:medical_record_id', updateMedicalRecord);
router.delete('/:medical_record_id', deleteMedicalRecord);

export default router;



