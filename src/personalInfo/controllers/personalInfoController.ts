import { Request, Response } from 'express';
import { PersonalInfoService } from '../service/personal_infoService';
import { PersonalInfo } from '../models/personal_info';

export const getPersonalInfos = async (_req: Request, res: Response) => {
  try {
    const personalInfos = await PersonalInfoService.getAllPersonalInfos();
    res.status(200).json(personalInfos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPersonalInfoById = async (req: Request, res: Response) => {
  try {
    const personal_info_id = parseInt(req.params.personal_info_id, 10);
    const personalInfo = await PersonalInfoService.getPersonalInfoById(personal_info_id);
    if (personalInfo) {
      res.status(200).json(personalInfo);
    } else {
      res.status(404).json({ message: 'No se encontró la información personal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPersonalInfo = async (req: Request, res: Response) => {
  try {
    const newPersonalInfo: PersonalInfo = req.body;
    const createdPersonalInfo = await PersonalInfoService.createPersonalInfo(newPersonalInfo);
    res.status(201).json(createdPersonalInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePersonalInfo = async (req: Request, res: Response) => {
  try {
    const personal_info_id = parseInt(req.params.personal_info_id, 10);
    const updatedPersonalInfo = await PersonalInfoService.updatePersonalInfo(personal_info_id, req.body);
    if (updatedPersonalInfo) {
      res.status(200).json(updatedPersonalInfo);
    } else {
      res.status(404).json({ message: 'No se encontró la información personal para actualizar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePersonalInfo = async (req: Request, res: Response) => {
  try {
    const personal_info_id = parseInt(req.params.personal_info_id, 10);
    const deleted = await PersonalInfoService.deletePersonalInfo(personal_info_id);
    if (deleted) {
      res.status(200).json({ message: 'Información personal eliminada' });
    } else {
      res.status(404).json({ message: 'No se encontró la información personal para eliminar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



